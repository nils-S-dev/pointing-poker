import { Optional } from "./Optional";
export interface User {
    name: string;
    estimation?: Optional<number>,
    socketId: string;
}