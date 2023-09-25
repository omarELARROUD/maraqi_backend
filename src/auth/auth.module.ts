import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { LocalStrategy } from './local.strategy';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { JwtModule } from '@nestjs/jwt';
import { SessionSerializer } from './utils/Serializer';
import { EventsModule } from 'src/events/events.module';
@Module({
  imports: [JwtModule,TypeOrmModule.forFeature([User]),UserModule,EventsModule],
  controllers: [AuthController],
  providers: [AuthService,UserService,GoogleStrategy,SessionSerializer,
  {
    provide: 'AUTH_SERVICE',
    useClass: AuthService,
  }
  ],
})
export class AuthModule {}
