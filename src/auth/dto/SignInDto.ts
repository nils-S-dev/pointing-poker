import { IsEnum } from "class-validator";

export class SignInDto {
    readonly user: string;
    readonly room: string;
}