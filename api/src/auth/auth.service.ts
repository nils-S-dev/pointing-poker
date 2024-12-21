import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService
    ) { }

    async signIn(
        user: string,
        room: string,
    ): Promise<string> {
        const payload = { sub: `${user}@${room}`, user, room};
        return await this.jwtService.signAsync(payload)
    }

    decode<T>(
        token: string
    ): T {
        return this.jwtService.decode<T>(token)
    }

}
