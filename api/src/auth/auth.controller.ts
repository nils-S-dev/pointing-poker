import { Body, Controller, Get, Post, UseGuards, Request, Param, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { GetTokenDto } from './dto/SignInDto';
import { RoomMismatchException } from './exception/RoomMismatchException';

@Controller('auth')
export class AuthController {

    constructor(
      private authService: AuthService
    ) {}

    @Post()
    async getToken(@Body() { user, room }: GetTokenDto) {
      return {
        token: await this.authService.getToken(user, room)
      };
    }

    @UseGuards(AuthGuard)
    @Get("/validate/:room")
    protected(@Param("room") roomName: string, @Req() request: Request) {
      if (request['auth'].room !== roomName) throw new RoomMismatchException()
      return true;
    }

}
