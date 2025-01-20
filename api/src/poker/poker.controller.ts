import { Body, Controller, Get, Post } from "@nestjs/common";
import { RoomsService } from "./poker.service";
import { Room } from "./types/Room";
import { CreateRoomDto } from "./dto/CreateRoomDto";
import { AuthService } from "../auth/auth.service";
import { ConfigService } from "@nestjs/config";

@Controller('rooms')
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @Post()
  async create(@Body() { user, procedure }: CreateRoomDto): Promise<{
    token: string,
    room: Room
  }> {
    const room = this.roomsService.create(procedure) 
    return {
      token: await this.authService.signIn(user, this.roomsService.create(procedure).getName()),
      room
    }
  }
}