/* eslint-disable @typescript-eslint/ban-types */
import { AuthService } from './../auth.service';
import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";

export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService){
            super();
        }
    
    // eslint-disable-next-line @typescript-eslint/ban-types
    serializeUser(user: any, done: Function) {
        done(null, user)
    }
    async deserializeUser(payload: any, done: Function) {
        const user =await this.authService.findUser(payload.id);
        return user ? done(null,user) : done(null,null);
    }
    
}