import { Test } from "@nestjs/testing";
import { RoomService } from "./room.service";
import { Room } from "./types/Room";
import { User } from "./types/User";

describe('RoomService', () => {
  let roomService: RoomService

  const USER_A: User = new User(
    "Hubert",
    "123",
    "123"
  )

  const USER_B: User = new User(
    "Herbert",
    "321",
    "321"
  )

  const ROOM: Room = new Room(
    "My Room", // must be unique
    "fibonacci",
    [
      USER_A
    ],
    false
  )

  const ROOMS = [
    ROOM
  ]

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [RoomService],
      }).compile();

    roomService = moduleRef.get(RoomService);

    // add mock rooms
    roomService.setRooms(ROOMS)
  });

  describe("getAll", () => {
    it("returns all rooms", () => {
      const result = roomService.getAll();
      expect(result.length).toBe(ROOMS.length);
      ROOMS.forEach(room => {
        expect(
          result.find(i => i.getName() === room.getName())
        ).toBeTruthy();
      })
    })
  })

  describe("create", () => {

    it("creates the room", () => {
      const room = roomService.create(
        ROOM.getProcedure(), ROOM.getName()
      )
      expect(room.getName()).toBe(ROOM.getName())
      expect(room.getProcedure()).toBe(ROOM.getProcedure())
    })

    it("assigns a random name if none provided", () => {
      const room = roomService.create(
        ROOM.getProcedure()
      )
      expect(room.getName()).toBeTruthy();
    })

    it("stores the room at the service", () => {
      const room = roomService.create(
        ROOM.getProcedure()
      )
      expect(
        roomService.getAll().find(r => r.getName() === room.getName())
      ).toBeTruthy()
    })
  })

  describe("join", () => {
    it("should add user to room", () => {
      const room = roomService.join(
        ROOM.getName(),
        USER_B
      )
      expect(
        room.getUsers().find(u => u.getName() === USER_B.getName())
      ).toBeTruthy();
    })
  })

  describe("leave", () => {
    it("should remove user from room", () => {
      const room = roomService.leave(
        ROOM.getName(),
        USER_A
      )
      expect(
        room.getUsers().find(u => u.getName() === USER_A.getName())
      ).toBeFalsy();
    })
  })

  describe("getRoomByName", () => {
    it("should retrieve room by its name", () => {
      const room = roomService.getRoomByName(ROOM.getName());
      expect(room.getName()).toBe(ROOM.getName())
    })
  })

});