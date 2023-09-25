import { User } from 'src/user/entities/user.entity';
import { AuthenticateDto } from './dto/authenticate.dto';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { sign} from 'jsonwebtoken';
import { decryptData, encryptData } from '../utils/password.encrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email : string) {
    return await this.userService.findByEmail(email);
  
  }

  async authenticate(authenticateDto : AuthenticateDto) {
    const user = await this.userService.findByEmail(authenticateDto.email);
    if (!user) {
      throw new NotFoundException('email not found');    }

      if (! (authenticateDto.password === decryptData(user.password))) {
        throw new UnauthorizedException('password not valid');
      }
      if(! (authenticateDto.role===user.role)){
        throw new UnauthorizedException("role not valid");
      }
    const token = sign({ email:authenticateDto.email ,role:authenticateDto.role}, 'secrete');
    return{ token,user}
  }

  async findUser(id: number){
    const user= await this.userService.findOne(id);
    console.log(decryptData(user.password))
    return user
  }
}