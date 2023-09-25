import { IsEmail, IsNotEmpty, IsString} from "class-validator";
import { Role } from "../../utils/role";

export class ProfileDto {
    @IsNotEmpty()
    readonly id:number;

    @IsNotEmpty()
    @IsEmail()
    readonly email:string;

    @IsNotEmpty()
    @IsString()
    readonly password:string;

    @IsNotEmpty()
    @IsString()
    readonly role:Role;
}