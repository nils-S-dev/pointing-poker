import { Module } from '@nestjs/common';
import { RoomsGateway } from './room.gateway';
import { RoomsService } from './room.service';
import { RoomController } from './room.controller';
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
        RoomController
    ]
})
export class RoomModule {}
