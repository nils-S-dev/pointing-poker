import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
      private authService: AuthService
    ) {}

    @Post()
    signIn(@Body("name") name: string, @Body("room") room: string) {
      return this.authService.signIn(name, room);
    }

    @UseGuards(AuthGuard)
    @Get()
    protected(@Request() req) {
      return req.user;
    }

}
