import { Test } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  const USER = "John Doe"
  const ROOM = "The Room"

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [
          JwtModule.register({
            global: true,
            secret: "valar-morgulis",
            signOptions: { expiresIn: '60s' },
          }),
        ],
        providers: [AuthService],
      }).compile();

    authService = moduleRef.get(AuthService);
    jwtService = moduleRef.get(JwtService);
  });

  describe("encode", () => {

    it("should sign the payload into a JSON-Web-Token", async () => {
      const token = await authService.encode(USER, ROOM);
      const { user, room } = await jwtService.decode(token)
      expect(user).toBe(USER)
      expect(room).toBe(ROOM)
    });

  })

  describe("decode", () => {

    it("should decode a JSON-Web-Token", () => {
      const token = jwtService.sign({
        user: USER,
        room: ROOM
      })
      const { user, room } = authService.decode(token) 
      expect(user).toBe(USER)
      expect(room).toBe(ROOM)
    });

    it("should fail when token has been encoded with wrong secret", () => {
      const token = jwtService.sign({
        user: USER,
        room: ROOM
      })
      const { user, room } = authService.decode(token) 
      expect(user).toBe(USER)
      expect(room).toBe(ROOM)
    });

  })
});