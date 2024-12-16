import { Injectable } from '@nestjs/common';
import { adjectives, colors, starWars, uniqueNamesGenerator } from 'unique-names-generator';
import { Socket } from 'socket.io';
import { Optional } from '@/types/Optional';
import { Room } from './types/Room';
import { User } from './types/User';
import { Procedure } from './types/enum/Procedure';

@Injectable()
export class RoomsService {

    private rooms: Array<Room> = new Array();

  getAll(): Array<Room> {
    return this.rooms;
  }

  create(procedure: Procedure, name?: string): Room {
    // rooms created by this application are prefixed by $ in order to differentiate them from the default room
    const room = new Room(
      name || `$-${uniqueNamesGenerator({
      dictionaries: [colors, adjectives, starWars],
      separator: " ",
      style: 'lowerCase'
    }).replaceAll(" ", "-")}`,  
      procedure
    )
    console.log('ROOM', room);
    this.rooms.push(room)
    return room;
  }
  
  join(name: string, user: User): Room {
    const room: Optional<Room> = this.findByName(name);
    room.addUser(user)
    return room;
  }

  leave(name: string, user: User): Room {
    const room: Optional<Room> = this.findByName(name);
    room.removeUser(user.socketId)
    return room;
  }

  estimate(room: Room, socketId: string, estimation: number): User {
    const user = room.findUser(socketId);
    user.estimation = estimation;
    return user;
  }

  getRoomName(socket: Socket): Optional<string> {
    return Array.from(socket.rooms).filter((r: string) => r.includes("$")).pop();
  }
  
  getRoom(socket: Socket): Optional<Room> {
    return this.findByName(this.getRoomName(socket));
  }

  private findByName(name: string): Optional<Room> {
    return this.rooms.find((room: Room) => room.getName() === name);
  }

}
