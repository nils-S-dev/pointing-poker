import { Optional } from "@/types/Optional";
import { User } from "./User";
import { Procedure } from "./enum/Procedure";
export class Room {

    constructor(
        private name: string,
        private procedure: Procedure,
        private users: Array<User> = new Array(),
        private revealed: boolean = false
    ) {}

    addUser(user: User): Room {
        this.users.push(user);
        return this;
    }

    findUser(socketId: string): Optional<User> {
        return this.users.find(user => user.socketId === socketId);
    }

    findUserByToken(token: string): Optional<User> {
        return this.users.find(user => user.token === token);
    }

    removeUser(socketId: string): Room {
        this.users = this.users.filter((user: User) => user.socketId !== socketId);
        return this;
    }

    reveal(): Room {
        this.revealed = true;
        return this;
    }

    reset(): Room {
        this.revealed = false;
        this.users = this.users.map((user: User) => ({
            ...user,
            estimation: undefined
        }))
        return this;
    }

    getName(): string {
        return this.name;
    }

    getUsers(): Array<User> {
        return this.users;
    }

}