import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '24h'
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule
  ],
  exports: [
    AuthService
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
