import * as io from "socket.io-client";
import { Events } from "./types/enum/Events";
import { RoomsGateway } from "./poker.gateway";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { RoomsService } from "./poker.service";
import { RoomsController } from "./poker.controller";
import { Room } from "./types/Room";
import { User } from "./types/User";
import { Procedure } from "./types/enum/Procedure";
import { AuthService } from "../auth/auth.service";
import { MockFunctionMetadata, ModuleMocker } from "jest-mock";
import { AuthModule } from "../auth/auth.module";


/**
 * @TODO broken test
 * Background: Join with token, result of token decoding cannot be mocked succesfully
 * find a workaround or scrap it, it is either way too complex for this size of project
 */

  const moduleMocker = new ModuleMocker(global);

/**
 * Actually and end-to-end test testing the behaviour of joining a room and interacting inside of it
 */

/**
 * @TODO consider view of second user when testing --> second socket
 * Alice & Bob, John Doe & Jane Doe
 */
describe('RoomsGateway', () => {

  let service: RoomsService;

  let app: INestApplication;
  let ioClient: io.Socket;

  let room: Room;

  const USER_NAME = "John Doe";
  const ROOM_NAME = "$-testing-room";

  beforeAll(async () => {
    // Instantiate the app
    const moduleFixture = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [RoomsController],
      providers: [RoomsGateway, RoomsService],
    })
    .useMocker((token) => {
      if (token === RoomsService) {
        return { readToken: jest.fn().mockResolvedValue({
          user: USER_NAME,
          room: ROOM_NAME
        }) };
      }
      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(
          token,
        ) as MockFunctionMetadata<any, any>;
        const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        return new Mock();
      }
    })
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

    room = service.create(Procedure.FIBONACCI, ROOM_NAME);

    ioClient.connect();

  });

  afterAll(async () => {
    ioClient.disconnect();
    app.close();
  });

  describe("[Event] `join`", () => {

    it('should add user to room', async () => {
    
      ioClient.emit(Events.JOIN, {
        user: USER_NAME,
        room: room.getName()
      });
  
      await new Promise<void>((resolve) => {
        ioClient.on(Events.JOIN, (data) => {
          expect(data.user).toBeTruthy();
          expect(data.user.name).toBe(USER_NAME);
          expect(data.room).toBeTruthy();
          expect(data.room.name).toBe(room.getName());
          expect(data.room.users.some(u => u.name === USER_NAME)).toBeTruthy();
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
          expect(data.user.name).toBe(USER_NAME);
          expect(data.room.name).toBe(room.getName());
          const userInRoom = data.room.users.find(user => ioClient.id === user.socketId);
          expect(userInRoom).toBeTruthy();
          expect(userInRoom).toBe
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
          expect(data.user.name).toBe(USER_NAME);
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
          expect(data.user.name).toBe(USER_NAME);
          expect(data.room.revealed).toBe(false);
          expect(data.room.users.find((user: User) => !!user.estimation)).toBeFalsy()
          resolve();
        });
      });
    })
  })
  })