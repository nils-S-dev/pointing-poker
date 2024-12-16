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

async function createNestApp(...providers: any): Promise<INestApplication> {
    const testingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: providers,
    }).compile();
    return testingModule.createNestApplication();
  }

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

  beforeAll(async () => {
    // Instantiate the app
    app = await createNestApp(RoomsGateway, RoomsService);

    const moduleFixture = await Test.createTestingModule({
        controllers: [RoomsController],
        providers: [RoomsGateway, RoomsService],
      }).compile();
    app = moduleFixture.createNestApplication();

    // Get the service instance from the app instance
    service = app.get<RoomsService>(RoomsService);

    // Create a new client that will interact with the gateway
    ioClient = io.io("http://localhost:3000", {
      autoConnect: false,
      transports: ["websocket", "polling"],
    });

    app.listen(3000);

    room = service.create(Procedure.FIBONACCI);

    ioClient.connect();

  });

  afterAll(async () => {
    ioClient.disconnect();
    app.close();
  });

  const userName = "John Doe"

  describe("[Event] `join`", () => {

    it('should add user to room', async () => {
    
      ioClient.emit(Events.JOIN, {
        user: userName,
        room: room.getName()
      });
  
      await new Promise<void>((resolve) => {
        ioClient.on(Events.JOIN, (data) => {
          expect(data.user).toBeTruthy();
          expect(data.user.name).toBe(userName);
          expect(data.room).toBeTruthy();
          expect(data.room.name).toBe(room.getName());
          expect(data.room.users.some(u => u.name === userName)).toBeTruthy();
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
          expect(data.user.name).toBe(userName);
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
          expect(data.user.name).toBe(userName);
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
          expect(data.user.name).toBe(userName);
          expect(data.room.revealed).toBe(false);
          expect(data.room.users.find((user: User) => !!user.estimation)).toBeFalsy()
          resolve();
        });
      });
    })
  })
  })