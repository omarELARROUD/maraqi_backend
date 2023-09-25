import { GenerateOtpDto } from './../otp/dto/generate.otp.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { CreateMailingDto } from './dto/create-mailing.dto';
import { UpdateMailingDto } from './dto/update-mailing.dto';

@Controller('mailing')
export class MailingController {
  constructor(readonly mailingService: MailingService) {}
  @Post()
  public sendMail(@Body() dto: GenerateOtpDto) {
    this.mailingService.sendMail(dto);
  }
}