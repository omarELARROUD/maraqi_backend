import { Type } from "class-transformer";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { IsNumber, IsOptional, ValidateNested } from "class-validator";

export class CreateStudentDto {

    @ValidateNested({ each: true })
    @Type(() => CreateUserDto)
    user: CreateUserDto;

    @IsNumber()
    @IsOptional()
    khatmaNumber?: number;
  
    @IsNumber()
    @IsOptional()
    score?: number;

  
}
