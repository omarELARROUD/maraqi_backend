import { Module } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { MailingController } from './mailing.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { OtpService } from 'src/otp/otp.service';
import { OtpModule } from 'src/otp/otp.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OTP } from 'src/otp/entities/otp.entity';
@Module({
  imports:[TypeOrmModule.forFeature([OTP])],
  controllers: [MailingController],
  providers: [MailingService,ConfigService,OtpService],
})
export class MailingModule {}
