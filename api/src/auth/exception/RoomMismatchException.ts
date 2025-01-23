import { HttpException, HttpStatus } from '@nestjs/common';

export class RoomMismatchException extends HttpException {
  constructor() {
    super('room from the token does not match room in url', HttpStatus.FORBIDDEN);
  }
}