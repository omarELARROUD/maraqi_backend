import { IsEmail, IsEnum, IsNotEmpty, IsOptional,IsString, Length, Allow, IsDate } from "class-validator";
import { Role } from "../../utils/role";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;
  
    @IsNotEmpty()
    @IsString()
    lastName: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    // @IsDate()
    birthDate: string;
  
    @IsOptional()
    @Allow()
    @IsString()
    country: string|null;
  
    @IsNotEmpty()
    @IsEnum(['male', 'female'])
    gender: string;
  
    @IsNotEmpty()
    // @IsPhoneNumber()
    phoneNumber: string;
  
    @IsOptional()
    @Allow()
    @IsString()
    profession: string|null;
  
    @IsOptional()
    @Allow()
    @IsString()
    profilePicture: string|null;
  
    @IsNotEmpty()
    @Length(8, 20)
    password: string;

    @IsNotEmpty()
    @IsString()
    role:Role;
}
