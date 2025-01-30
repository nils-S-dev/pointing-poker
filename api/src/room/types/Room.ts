import { Optional } from "@/types/Optional";
import { User } from "./User";
export class Room {

    constructor(
        private name: string,
        private procedure: string,
        private users: Array<User> = new Array(),
        private revealed: boolean = false
    ) {}

    addUser(user: User): Room {
        this.users.push(user);
        return this;
    }

    findUser(socketId: string): Optional<User> {
        return this.users.find(user => user.getSocketId() === socketId);
    }

    findUserByToken(token: string): Optional<User> {
        return this.users.find(user => user.getToken() === token);
    }

    removeUser(socketId: string): Room {
        this.users = this.users.filter((user: User) => user.getSocketId() !== socketId);
        return this;
    }

    estimate(socketId: string, estimation: number): User {
        const user = this.findUser(socketId);
        user.setEstimation(estimation);
        // auto reveal when everyone has estimated
        if (this.getUsers().every(user => user.getEstimation() !== undefined)) {
            this.reveal();
        }
        return user;
      }

    reveal(): Room {
        this.revealed = true;
        return this;
    }

    reset(): Room {
        this.revealed = false;
        this.users.forEach(user => user.setEstimation(undefined))
        return this;
    }

    getName(): string {
        return this.name;
    }

    getProcedure(): string {
        return this.procedure;
    }

    getUsers(): Array<User> {
        return this.users;
    }

}