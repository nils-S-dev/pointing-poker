import { Body, Controller, Get, Post } from "@nestjs/common";
import { RoomsService } from "./poker.service";
import { Room } from "./types/Room";
import { CreateRoomDto } from "./dto/CreateRoomDto";
import { AuthService } from "../auth/auth.service";

@Controller('rooms')
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly authService: AuthService
  ) {}

  @Get("health")
  health(): string {
    return "ok";
  }

  // @TODO protect for admin role (or remove)
  @Get()
  getAll(): Array<Room> {
    return this.roomsService.getAll();
  }

  @Post()
  async create(@Body() { user, procedure }: CreateRoomDto): Promise<{
    token: string,
    room: Room
  }> {
    console.log('CREATE ROOM', user, procedure);
    const room = this.roomsService.create(procedure) 
    return {
      token: await this.authService.signIn(user, room.getName()),
      room
    }
  }
}