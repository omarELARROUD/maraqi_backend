import { AuthenticateDto } from './dto/authenticate.dto';
import { Controller, Get, Req, Post, Request, UseGuards, Res, Body, HttpStatus, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './utils/Guards';
import { Role } from 'src/utils/role';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  findAll(@Param()id) {
    return this.authService.findUser(id);
  }

  @Post('login')
  // @UseGuards(AuthGuard('local'))
  async login(@Res() res, @Body() authenticateDto: AuthenticateDto ) {
      try{
        const response = await this.authService.authenticate(authenticateDto);
        return res.status(HttpStatus.OK).json({response});
      }catch(error){
        return res.status(error.status).json(error.response);
        
      }
    
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  handleLogin(@Body() role: Role){
      return {msg: 'login ...'}
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect(){
      return {msg: 'Success Login'}
  }

  @Get('google/register')
  @UseGuards(new GoogleAuthGuard('register'))
  handleRegister(){
      return {msg: 'register success ...'}
  }

  @Get('google/register/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect1(){
      return {msg: 'Success Login'}
  }
}