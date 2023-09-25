import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { ReqType } from '../enums/ReqType';

export class GenerateOtpDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  email: string;

  @IsEnum(ReqType)
    requestType: 'Confirm' | 'Reset';
}
