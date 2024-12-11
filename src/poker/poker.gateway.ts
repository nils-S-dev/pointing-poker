import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { RoomsService } from "./poker.service";
import { Room } from "./types/Room";
import { Logger } from "@nestjs/common";
import { Events } from "./types/enum/Events";
import { Messages } from "./types/enum/Messages";
import { Optional } from "@/types/Optional";
import { User } from "./types/User";

@WebSocketGateway()
export class RoomsGateway {

    constructor(
        private readonly roomsService: RoomsService
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

    @SubscribeMessage(Events.JOIN)
    async handleJoin(
        @MessageBody(Messages.ROOM) roomName: string,
        @MessageBody(Messages.USER) userName: string,
        @ConnectedSocket() socket: Socket,
    ) {
        this.logger.log(`JOIN | User ${socket.id} (${userName}) joins room ${roomName}`)

        /** @TODO handle socket logic directly in service -> but write tests beforehand. */
        await this.server.in(socket.id).socketsJoin(roomName)

        const room: Room = this.roomsService.join(roomName, {
            name: userName,
            socketId: socket.id
        });

        this.logger.log(`${socket.id} (${userName}) joined ${room.getName()}`)

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

}