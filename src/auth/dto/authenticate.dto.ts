import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "../../utils/role";

export class AuthenticateDto{

    @IsEmail()
    @IsNotEmpty()
    readonly email:string;

    @IsNotEmpty()
    @IsString()
    readonly password:string;

    @IsNotEmpty()
    @IsEnum(Role)
    readonly role:Role;
}