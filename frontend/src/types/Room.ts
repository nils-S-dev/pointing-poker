import { Procedure } from "../enums/Procedure";
import { User } from "./User";

/** @TODO move to shared "types" folder as type is used in FE and BE ! */
export interface Room {
    name: string;
    procedure: Procedure,
    users: Array<User>,
    revealed: boolean
}