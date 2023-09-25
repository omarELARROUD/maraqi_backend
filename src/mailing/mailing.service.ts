import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateMailingDto } from './dto/create-mailing.dto';
import { UpdateMailingDto } from './dto/update-mailing.dto';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';
import { OtpService } from 'src/otp/otp.service';
import { GenerateOtpDto } from 'src/otp/dto/generate.otp.dto';

@Injectable()
export class MailingService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
    private readonly otpService: OtpService,
    ) {}  // async sendEmail(to: string, subject: string, template: string, context: any): Promise<void> {

  private async setTransport() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      this.configService.get('CLIENT_ID'),
      this.configService.get('CLIENT_SECRET'),
      'https://developers.google.com/oauthplayground',
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject('Failed to create access token');
        }
        resolve(token);
      });
    });

    const config: Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('EMAIL'),
        clientId: this.configService.get('CLIENT_ID'),
        clientSecret: this.configService.get('CLIENT_SECRET'),
        accessToken,
      },
    };
    this.mailerService.addTransporter('gmail', config);
  }
  public async sendMail(dto:GenerateOtpDto) {
    const otp = await this.otpService.generateOtp(dto);
    const code = otp.code;
    await this.setTransport();
    this.mailerService
      .sendMail({
        transporterName: 'gmail',
        to: dto.email, // list of receivers
        from: 'noreply@nestjs.com', // sender address
        subject: 'Verficiaction Code', // Subject line
        template: 'action',
        context: {
          // Data to be sent to template engine..
          code: code,
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

}

