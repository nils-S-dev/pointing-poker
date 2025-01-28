import { IsNotEmpty } from "class-validator";

export class GetTokenDto {

    @IsNotEmpty()
    user: string;

    @IsNotEmpty()
    room: string;
}