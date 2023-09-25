import { AuthenticateDto } from './dto/authenticate.dto';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  // async validate(authenticateDto:AuthenticateDto): Promise<any> {
  //   return this.authService.validateUser(authenticateDto);
  // }
}