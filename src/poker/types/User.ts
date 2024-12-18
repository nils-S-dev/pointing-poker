import { Nullable } from "@/types/Nullable";

export interface User {
    name: string;
    estimation?: Nullable<number>,
    socketId: string;
    token: string;
}