import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { RoomsService } from "./poker.service";
import { Room } from "./types/Room";
import { Logger } from "@nestjs/common";
import { Events } from "./types/enum/Events";
import { Messages } from "./types/enum/Messages";
import { Optional } from "@/types/Optional";
import { User } from "./types/User";
import { AuthService } from "../auth/auth.service";

@WebSocketGateway()
export class RoomsGateway {

    constructor(
        private readonly roomsService: RoomsService,
        private readonly authService: AuthService
    ) {
        console.log("Gateway instantiated");
    }

    @WebSocketServer() server: Server;

    private logger = new Logger('RoomsGateway');

    // whenever a user connects
    handleConnection(client: Socket) {
        console.log('new user connected', client.id);
    }

    // whenever a user disconnects
    handleDisconnection(client: Socket) {
        console.log('user disconnected', client.id);
    }

    /** ONLY FOR TESTING PURPOSES **/
    @SubscribeMessage(Events.DEBUG)
    async debug(
        @MessageBody() body: {
            message: string;
        }
    ) {
        console.log("DEBUG");
        this.logger.log(`DEBUG: Sending ${body.message}`)
        return {
            event: Events.DEBUG,
            data: body.message
        }
    }

    /**
     * @TODO socket should only be in ONE room at the same time!!! MAKE SURE!
     */
    @SubscribeMessage(Events.JOIN)
    async handleJoin(
        @MessageBody("token") token: string,
        @ConnectedSocket() socket: Socket,
    ) {
        const payload = this.readToken(token);
        const roomName = payload.room
        const usr = payload.user;

        this.logger.log(`JOIN | User ${socket.id} (${usr}) joins room ${roomName}`)

        await this.server.in(socket.id).socketsJoin(roomName)

        socket.data.user = usr;
        socket.data.token = token;

        const room: Room = this.roomsService.join(roomName, {
            name: usr,
            socketId: socket.id
        });

        this.logger.log(`${socket.id} (${usr}) joined ${room.getName()}`)

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
        return this.authService.decode<{ user: string, room: string }>(token);
    }

}