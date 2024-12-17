import { IsEnum } from "class-validator";
import { Procedure } from "../types/enum/Procedure";

export class CreateRoomDto {

    @IsEnum(Procedure)
    readonly procedure: Procedure;

    readonly user: string;
    
}