import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

describe.only('Auth', () => {
  let app: INestApplication;
  let jwtService = {
    signAsync: (payload) => Promise.resolve(TOKEN),
    verifyAsync: (token) => {
      if (token === TOKEN) {
        return Promise.resolve({
          user: USER,
          room: ROOM
        })
      }
      if (token === WRONG_TOKEN) {
        return Promise.resolve({
          user: USER,
          room: "another-room"
        })
      }
      throw new Error();
    },
    decode: (token) => Promise.resolve({
      user: USER,
      room: ROOM
    })
  }

  const TOKEN = "valid-token"
  const WRONG_TOKEN = "wrong-token"
  const INVALID_TOKEN = "invalid-token"

  const ROUTE = `/auth`

  const USER = "Johne Doe";
  const ROOM = "The Room";


  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [
            JwtModule.register({
              global: true,
              secret: "valar-morgulis",
              signOptions: { expiresIn: '60s' },
            }),
            AuthModule
        ],
    })      
    .overrideProvider(JwtService)
    .useValue(jwtService)
    .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    jwtService = moduleRef.get(JwtService)
    await app.init();
  });

  describe(`POST /auth`, () => {
    it("should return JSON-Web-Token if payload is valid", () => {
      return request(app.getHttpServer())
          .post(ROUTE)
          .send({ user: USER, room: ROOM })
          .expect(201)
          .expect({ token: TOKEN })
    })
    it("should return an error if the payload is invalid", () => {
      return request(app.getHttpServer())
            .post(ROUTE)
            .send({ user: USER })
            .expect(400)
    })
  });

  describe(`GET /auth/validate/:room`, () => {
    it("should succeed if JSON-Web-Token is valid and room matches", () => {
      return request(app.getHttpServer())
          .get(`${ROUTE}/validate/${ROOM}`)
          .set("Authorization", `Bearer ${TOKEN}`)
          .expect(200)
    })
    it("should return an error if token is invalid", () => {
      return request(app.getHttpServer())
            .get(`${ROUTE}/validate/${ROOM}`)
            .set("Authorization", `Bearer ${INVALID_TOKEN}`)
            .expect(401)
    })
    it("should return an error if room does not match", () => {
      return request(app.getHttpServer())
            .get(`${ROUTE}/validate/${ROOM}`)
            .set("Authorization", `Bearer ${WRONG_TOKEN}`)
            .expect(403)
    })
  });

  afterAll(async () => {
    await app.close();
  });
});