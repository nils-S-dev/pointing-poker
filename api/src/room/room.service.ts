import { Injectable, Logger } from '@nestjs/common';
import { adjectives, colors, starWars, uniqueNamesGenerator } from 'unique-names-generator';
import { Socket } from 'socket.io';
import { Optional } from '@/types/Optional';
import { Room } from './types/Room';
import { User } from './types/User';

@Injectable()
export class RoomService {

    private rooms: Array<Room> = new Array();

    private logger = new Logger('RoomsGateway');

  setRooms(r: Array<Room>): Array<Room> {
    return (this.rooms = r, this.rooms);
  }

  getAll(): Array<Room> {
    return this.rooms;
  }

  create(procedure: string, name?: string): Room {
    // rooms created by this application are prefixed by $ in order to differentiate them from the default room
    const room = new Room(
      name || `$-${uniqueNamesGenerator({
      dictionaries: [colors, adjectives, starWars],
      separator: " ",
      style: 'lowerCase'
    }).replaceAll(" ", "-")}`,  
      procedure
    )
    this.rooms.push(room)
    return room;
  }

  join(name: string, user: User): Room {
    const room: Optional<Room> = this.getRoomByName(name);
    room.addUser(user)
    return room;
  }

  leave(name: string, user: User): Optional<Room> {
    const room: Optional<Room> = this.getRoomByName(name);
    room.removeUser(user.getSocketId());
    if (room.getUsers().length < 1) {
      // remove empty rooms
      this.rooms.filter(r => r.getName() !== room.getName())
    }
    return room;
  }

  getRoomName(socket: Socket): Optional<string> {
    return Array.from(socket.rooms).filter((r: string) => r.includes("$")).pop();
  }
  
  getRoom(socket: Socket): Optional<Room> {
    return this.getRoomByName(this.getRoomName(socket));
  }

  getRoomByName(name: string): Optional<Room> {
    return this.rooms.find((room: Room) => room.getName() === name);
  }

}
