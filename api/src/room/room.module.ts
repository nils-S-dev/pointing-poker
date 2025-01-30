import { Module } from '@nestjs/common';
import { RoomsGateway } from './room.gateway';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { AuthModule } from '@/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        AuthModule,
        ConfigModule,
    ],
    providers: [
        RoomsGateway,
        RoomService
    ],
    controllers: [
        RoomController
    ]
})
export class RoomModule {}
