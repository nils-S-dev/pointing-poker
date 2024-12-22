import { Module } from '@nestjs/common';
import { RoomsGateway } from './poker.gateway';
import { RoomsService } from './poker.service';
import { RoomsController } from './poker.controller';
import { AuthModule } from '@/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        AuthModule,
        ConfigModule
    ],
    providers: [
        RoomsGateway,
        RoomsService
    ],
    controllers: [
        RoomsController
    ]
})
export class PokerModule {}
