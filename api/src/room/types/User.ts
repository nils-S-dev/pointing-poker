import { Optional } from "@/types/Optional";
export interface User {
    name: string;
    estimation?: Optional<number>,
    socketId: string;
    token: string;
}