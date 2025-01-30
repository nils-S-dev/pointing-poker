import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { RoomService } from "./room.service";
import { Room } from "./types/Room";
import { Logger, UseFilters } from "@nestjs/common";
import { Events } from "./types/enum/Events";
import { Optional } from "@/types/Optional";
import { User } from "./types/User";
import { AuthService } from "../auth/auth.service";
import { WebsocketExceptionFilter } from "./filter/WebsocketExceptionFilter";

@WebSocketGateway(0, { 
    path: "/api/v1/rooms/gateway", 
    transports: ['websocket', 'polling'], 
    cors: process.env.NODE_ENV !== "production" ? true : {
        origin: process.env.ORIGIN
    }
})
@UseFilters(new WebsocketExceptionFilter())
export class RoomsGateway {

    constructor(
        private readonly roomsService: RoomService,
        private readonly authService: AuthService
    ) {}

    @WebSocketServer() server: Server;

    private logger = new Logger('RoomsGateway');

    handleDisconnect(@ConnectedSocket() socket: Socket) {
        this.handleLeave(socket);
    }

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
            // fixes an issue causing duplicate users to appear, e.g. when reconnecting
            await this.server.in(existingUser.getSocketId()).socketsLeave(roomName)
            existingUser.setSocketId(socket.id)
        } else {
            room = this.roomsService.join(roomName, new User(userName, socket.id, token));
    
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
        this.logger.log(`ESTIMATE | User ${user.getName()} estimates ${estimation} in ${room.getName()}`);
        room.estimate(socket.id, estimation);
        this.server.to(room.getName()).emit(Events.ESTIMATE, {
            user,
            room
        });
    }

    @SubscribeMessage(Events.REVEAL)
    handleReveal(@ConnectedSocket() socket: Socket) {
        const room: Room = this.roomsService.getRoom(socket);
        const user = room.findUser(socket.id);
        this.logger.log(`REVEAL | User ${user.getName()} reveals ${room}`);
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
        this.logger.log(`RESET | User ${user.getName()} resets ${room}`);
        room.reset();
        this.server.to(room.getName()).emit(Events.RESET, {
            user,
            room
        });
    }

    @SubscribeMessage(Events.LEAVE)
    async handleLeave(@ConnectedSocket() socket: Socket) {
        const room: Room = this.roomsService.getRoom(socket);
        if (!room) return;
        const user: Optional<User> = room.findUser(socket.id);
        this.logger.log(`LEAVE | User ${user?.getName()} leaves ${room}`);
        await this.server.in(socket.id).socketsLeave(room.getName())
        room.removeUser(socket.id);
        this.server.to(room.getName()).emit(Events.LEAVE, {
            user,
            room
        });
    }

    // for testability
    readToken(token: string): {
        user: string,
        room: string
    } {
        return this.authService.decode(token);
    }

}