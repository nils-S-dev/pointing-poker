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

  @Get("health")
  health(): string {
    return `${this.configService.get<string>('JWT_SECRET')} ${this.configService.get<string>('ORIGIN')} `;
  }


  @Get("debug")
  debug() {
    return this.roomsService.getAll();
  }

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