import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService
    ) { }

    async signIn(
        name: string,
        room: string,
    ): Promise<{ access_token: string }> {
        const payload = { sub: name, room };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

}
