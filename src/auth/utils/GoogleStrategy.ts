import { EventsGateway } from './../../events/events.gateway';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { AuthService } from '../auth.service';
import * as dotenv from 'dotenv';


import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Role } from 'src/utils/role';
import { sign } from 'jsonwebtoken';
import { log } from 'console';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    private readonly eventsGateway: EventsGateway,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { name, emails } = profile;
    // if (action === 'login') {
    const user = await this.authService.validateUser(emails[0].value);
    if (!user) {
      // Send an error message to the socket
      this.eventsGateway.handleFailedLogin()
      throw new NotFoundException('Email not found');
    }
  
    // if (!role === user.role) {
    //   socket.emit('validation', { success: false, message: 'Role not valid' });
    //   throw new UnauthorizedException('Role not valid');
    // }
  
    const token = sign({ email: user.email, role: user.role }, 'secrete');
    // console.log(token);
  
    // Send a success message with the token and user data to the socket
    this.eventsGateway.handleSuccessLogin()
    console.log(profile);
    
    return user;
    // }else if (action === 'register') {
      this.eventsGateway.handleRegister(profile._json)
    // }
  }
}