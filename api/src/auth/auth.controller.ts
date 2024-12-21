import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignInDto } from './dto/SignInDto';

@Controller('auth')
export class AuthController {

    constructor(
      private authService: AuthService
    ) {}

    @Post()
    async signIn(@Body() { user, room }: SignInDto) {
      console.log('Sign in')
      return {
        token: await this.authService.signIn(user, room)
      };
    }

    @UseGuards(AuthGuard)
    @Get("/validate")
    protected() {
      return true
    }

}
