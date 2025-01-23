import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { RoomsService } from "./poker.service";
import { Room } from "./types/Room";
import { Logger } from "@nestjs/common";
import { Events } from "./types/enum/Events";
import { Optional } from "@/types/Optional";
import { User } from "./types/User";
import { AuthService } from "../auth/auth.service";

/** @TODO always allow CORS for debugging purposes **/
@WebSocketGateway(0, { path: "/rooms/gateway", transports: ['websocket', 'polling'], cors: process.env.NODE_ENV !== "production" || process.env.NODE_ENV === "production"  ? true : {
    origin: process.env.ORIGIN
  } })
export class RoomsGateway {

    constructor(
        private readonly roomsService: RoomsService,
        private readonly authService: AuthService
    ) {}

    @WebSocketServer() server: Server;

    private logger = new Logger('RoomsGateway');

    @SubscribeMessage(Events.JOIN)
    async handleJoin(
        @MessageBody("token") token: string,
        @ConnectedSocket() socket: Socket,
    ) {
        const { room: roomName, user: userName } = this.readToken(token);

        this.logger.log(`JOIN | User ${socket.id} (${userName}) joins room ${roomName}`)

        // Fix for refreshing / rejoining: When using the same token the "old" user should be kicked and replaced
        let room: Optional<Room> = this.roomsService.getRoomByName(roomName)
        const existingUser: Optional<User> = room?.findUserByToken(token)
        if (existingUser) {
            await this.server.in(existingUser.socketId).socketsLeave(roomName)
            existingUser.socketId = socket.id
        } else {
            room = this.roomsService.join(roomName, {
                name: userName,
                socketId: socket.id,
                token
            });
    
            this.logger.log(`${socket.id} (${userName}) joined ${room.getName()}`)
        }
        await this.server.in(socket.id).socketsJoin(roomName)
        this.server.to(room.getName()).emit(Events.JOIN, {
            user: room.findUser(socket.id),
            room
        })
    }

    @SubscribeMessage(Events.ESTIMATE)
    handleEstimate(
        @MessageBody("estimation") estimation: number,
        @ConnectedSocket() socket: Socket,
    ) {
        const room = this.roomsService.getRoom(socket);
        const user = room.findUser(socket.id);
        this.logger.log(`ESTIMATE | User ${user.name} estimates ${estimation} in ${room.getName()}`);
        this.roomsService.estimate(room, socket.id, estimation);
        this.server.to(room.getName()).emit(Events.ESTIMATE, {
            user,
            room
        });
    }

    @SubscribeMessage(Events.REVEAL)
    handleReveal(@ConnectedSocket() socket: Socket) {
        const room: Room = this.roomsService.getRoom(socket);
        const user = room.findUser(socket.id);
        this.logger.log(`REVEAL | User ${user.name} reveals ${room}`);
        room.reveal();
        this.server.to(room.getName()).emit(Events.REVEAL, {
            user,
            room
        });
    }

    @SubscribeMessage(Events.RESET)
    handleReset(@ConnectedSocket() socket: Socket) {
        const room: Room = this.roomsService.getRoom(socket);
        const user = room.findUser(socket.id);
        this.logger.log(`RESET | User ${user.name} resets ${room}`);
        room.reset();
        this.server.to(room.getName()).emit(Events.RESET, {
            user,
            room
        });
    }

    @SubscribeMessage(Events.LEAVE)
    async handleLeave(@ConnectedSocket() socket: Socket) {
        const room: Room = this.roomsService.getRoom(socket);
        const user: Optional<User> = room.findUser(socket.id);
        this.logger.log(`RESET | User ${user?.name} leaves ${room}`);
        this.server.to(room.getName()).emit(Events.LEAVE, {
            user,
            room
        });
        await this.server.in(socket.id).socketsLeave(room.getName())
        room.removeUser(socket.id)
    }

    // for testability
    readToken(token: string): {
        user: string,
        room: string
    } {
        return this.authService.decode(token);
    }

}