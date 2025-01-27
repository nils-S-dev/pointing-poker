import { Body, Controller, Get, Post } from "@nestjs/common";
import { RoomsService } from "./room.service";
import { Room } from "./types/Room";
import { CreateRoomDto } from "./dto/CreateRoomDto";
import { AuthService } from "../auth/auth.service";
import { ConfigService } from "@nestjs/config";

@Controller('rooms')
export class RoomController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async createRoom(@Body() { user, procedure }: CreateRoomDto): Promise<{
    token: string,
    room: Room
  }> {
    const room = this.roomsService.create(procedure) 
    return {
      token: await this.authService.getToken(user, room.getName()),
      room
    }
  }
}