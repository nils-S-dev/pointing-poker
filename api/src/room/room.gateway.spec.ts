import * as io from "socket.io-client";
import { Events } from "./types/enum/Events";
import { RoomsGateway } from "./room.gateway";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { RoomsService } from "./room.service";
import { RoomController } from "./room.controller";
import { Room } from "./types/Room";
import { User } from "./types/User";
import { AuthModule } from "../auth/auth.module";
import { ConfigService } from "@nestjs/config";
import { mock, mockReset } from 'jest-mock-extended';
import { AuthService } from "../auth/auth.service";

describe('RoomGateway', () => {
  
  const authServiceMock = mock<AuthService>();

  let service: RoomsService;

  let app: INestApplication;
  let ioClient: io.Socket;

  let room: Room;

  const MOCK_ROOM_NAME = "$-testing-room";
  const MOCK_USER_NAME = "John Doe";

  beforeAll(async () => {
    // Instantiate the app
    const moduleFixture = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [RoomController],
      providers: [RoomsGateway, RoomsService, ConfigService],
    })
    .overrideProvider(AuthService) // override the dependency with the mocked version
    .useValue(authServiceMock)
    .compile();

    app = moduleFixture.createNestApplication();

    app.listen(3000);

    // Get the service instance from the app instance
    service = app.get<RoomsService>(RoomsService);

    // Create a new client that will interact with the gateway
    ioClient = io.io("http://localhost:3000", {
      autoConnect: false,
      transports: ["websocket", "polling"],
    });

    room = service.create(Procedure.FIBONACCI, MOCK_ROOM_NAME);

    ioClient.connect();

  });

  afterAll(async () => {
    ioClient.disconnect();
    app.close();
  });

  beforeEach(() => {
    mockReset(authServiceMock);
  });

  describe('[Event] `debug`', () => {

    it('should respond', async () => {
      ioClient.emit(Events.DEBUG);
      await new Promise<void>((resolve) => {
        ioClient.on(Events.DEBUG, () => {
          expect(true).toBeTruthy();
          resolve();
        });
      });
    })

  })

  describe("[Event] `join`", () => {

    it('should add user to room', async () => {

      authServiceMock.decode.mockReturnValueOnce({
        room: MOCK_ROOM_NAME,
        user: MOCK_USER_NAME
      });
    
      ioClient.emit(Events.JOIN, {
        token: "valar-morgulis" // token decoding is mocked
      });
  
      await new Promise<void>((resolve) => {
        ioClient.on(Events.JOIN, (data) => {
          expect(data.user).toBeTruthy();
          expect(data.user.name).toBe(MOCK_USER_NAME);
          expect(data.room).toBeTruthy();
          expect(data.room.name).toBe(room.getName());
          expect(data.room.users.some(u => u.name === MOCK_USER_NAME)).toBeTruthy();
          resolve();
        });
      });
  
    })
  })

  describe("[Event] `estimate`", () => {

    const estimation = 3;

    it('set estimation for user', async () => {
    
      ioClient.emit(Events.ESTIMATE, {
        estimation
      });
  
      await new Promise<void>((resolve) => {
        ioClient.on(Events.ESTIMATE, (data) => {
          expect(data.user.name).toBe(MOCK_USER_NAME);
          expect(data.room.name).toBe(room.getName());
          const userInRoom = data.room.users.find(user => ioClient.id === user.socketId);
          expect(userInRoom).toBeTruthy();
          expect(userInRoom.estimation).toBe(estimation)
          resolve();
        });
      });
  
    })
  })

  describe("[Event] `reveal`", () => {
    it('should set `revealed` to true', async () => {
  
      ioClient.emit(Events.REVEAL);

      await new Promise<void>((resolve) => {
        ioClient.on(Events.REVEAL, (data) => {
          expect(data.user.name).toBe(MOCK_USER_NAME);
          expect(data.room.revealed).toBe(true);
          resolve();
        });
      });
    })
  })

  describe("[Event] `reset`", () => {
    it('should set `revealed` to false and remove all estimations', async () => {
  
      ioClient.emit(Events.RESET);

      await new Promise<void>((resolve) => {
        ioClient.on(Events.RESET, (data) => {
          expect(data.user.name).toBe(MOCK_USER_NAME);
          expect(data.room.revealed).toBe(false);
          expect(data.room.users.find((user: User) => !!user.estimation)).toBeFalsy()
          resolve();
        });
      });
    })
  })

})