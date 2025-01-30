import { IsNotEmpty } from "class-validator";

export class CreateRoomDto {

    @IsNotEmpty()
    procedure: string; // can be any user-defined procedure. the API behaves agnostically.

    @IsNotEmpty()
    user: string;
}