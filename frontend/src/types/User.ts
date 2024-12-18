import { Nullable } from "./Nullable";

/** @TODO move to shared "types" folder as type is used in FE and BE ! */
export interface User {
    name: string;
    estimation?: Nullable<number>,
    socketId: string;
}