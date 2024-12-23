import { Optional } from "./Optional";

/** @TODO move to shared "types" folder as type is used in FE and BE ! */
export interface User {
    name: string;
    estimation?: Optional<number>,
    socketId: string;
}