import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/datasource';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailingModule } from './mailing/mailing.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { OtpModule } from './otp/otp.module';
import { EventsGateway } from './events/events.gateway';
import { EventsModule } from './events/events.module';

@Module({
  imports:[ConfigModule.forRoot({isGlobal: true}),
            PassportModule.register({session: true}),
            TypeOrmModule.forRoot(dataSourceOptions),
            AuthModule,
            StudentModule,
            UserModule,
            MailingModule,
            MailerModule.forRoot({
              transport: 'smtps://user@domain.com:pass@smtp.domain.com',
              template: {
                dir: process.cwd() + '/templates/',
                adapter: new HandlebarsAdapter(),
                options: {
                  strict: true,
                },
              },
            }),
            OtpModule,
            EventsModule
          ],
  controllers: [AppController],
  providers: [AppService, EventsGateway]
})
export class AppModule {}
