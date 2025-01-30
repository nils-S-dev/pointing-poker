import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '@/auth/auth.service';
import { AuthModule } from '@/auth/auth.module';
import { RoomModule } from './room.module';

describe('Room', () => {
  let app: INestApplication;

  let authService = {
    encode: (payload) => Promise.resolve(TOKEN),
  }

  const ROUTE = `/rooms`

  const TOKEN = "valid-token"

  const PROCEDURE = "fibonacci"
  const USER = "John Doe"

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [
            AuthModule,
            RoomModule
        ],
    })      
    .overrideProvider(AuthService)
    .useValue(authService)
    .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    authService = moduleRef.get(JwtService)
    await app.init();
  });

  describe(`POST /room`, () => {

    it("should return room and JSON-Web-Token if payload is valid", () => {
      return request(app.getHttpServer())
          .post(ROUTE)
          .send({ user: USER, procedure: PROCEDURE })
          .expect(201)
          .expect(res => expect(res.body).toMatchObject({
            token: TOKEN, // Ensures id is a number
            room: {
              name: expect.any(String),
              procedure: PROCEDURE,
              users: [],
              revealed: false
            }
          }));
    })

    it("should return an error if the payload is invalid", () => {
      return request(app.getHttpServer())
            .post(ROUTE)
            .send({ user: USER })
            .expect(400)
    })
  });

  afterAll(async () => {
    await app.close();
  });
});