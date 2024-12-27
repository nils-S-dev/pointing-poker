import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtDecoded } from './types/JwtDecoded';

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

    decode(
        token: string
    ): JwtDecoded {
        return this.jwtService.decode<JwtDecoded>(token)
    }

}
