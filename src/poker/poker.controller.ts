import { Controller, Get, Post } from "@nestjs/common";
import { RoomsService } from "./poker.service";
import { Room } from "./types/Room";
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

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
  create(): Room {
    return this.roomsService.create();
  }
}