import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OTP } from '../otp/entities/otp.entity';
import { GenerateOtpDto } from './dto/generate.otp.dto';
import { CheckOtpDto } from './dto/check.otp.dto';

@Injectable()
export class OtpService {
  constructor(@InjectRepository(OTP) private otpRepository: Repository<OTP>) {}

  async generateOtp(dto : GenerateOtpDto): Promise<OTP> {
    const otp = new OTP();
    otp.email = dto.email;
    otp.requestType = dto.requestType||'Confirm';
    otp.code = Math.floor(100000 + Math.random() * 900000);
    otp.createdAt = new Date();
    otp.verified = false;
    return await this.otpRepository.save(otp);
  }

  async verifyOtp(dto:CheckOtpDto): Promise<boolean> {
    const otp = await this.otpRepository.findOne({where: dto});
    if (otp) {
      otp.verified = true;
      await this.otpRepository.remove(otp);
      return true;
    }
    return false;
  }
}