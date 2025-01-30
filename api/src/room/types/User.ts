import { Optional } from "@/types/Optional";

export class User {
    constructor(
        private name: string,
        private socketId: string,
        private token: string,
        private estimation?: Optional<number>
    ) {}

    getName(): string {
        return this.name;
    }

    setSocketId(socketId: string): string {
        return (this.socketId = socketId, this.socketId)
    }

    getSocketId(): string {
        return this.socketId;
    }

    getToken(): string {
        return this.token;
    }

    setEstimation(estimation: Optional<number>): Optional<number> {
        return (this.estimation = estimation, this.estimation)
    }

    getEstimation(): Optional<number> {
        return this.estimation;
    }

}