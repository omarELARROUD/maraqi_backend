import { Body, Controller, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
import { CheckOtpDto } from './dto/check.otp.dto';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}
  @Post()
  async checkOTP(@Body() dto:CheckOtpDto){
    return await this.otpService.verifyOtp(dto)
  }

  
}
