import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  @Post('sign-up')
  async register(@Body() infoAuth: AuthDto) {
    const user = await this.userService.findOne(infoAuth.email);
    if (!user) {
      try {
        await this.userService.createUser(infoAuth.email, infoAuth.password);
      } catch (e) {
        throw new HttpException('Not create user', HttpStatus.BAD_REQUEST);
      }
      return { status: 'success' };
    } else {
      throw new HttpException('User exist', HttpStatus.FOUND);
    }
  }

  @Post('sign-in')
  async login(@Body() infoAuth: AuthDto) {
    try {
      const user = await this.userService.findOne(infoAuth.email);
      if (user) {
        const payload = { sub: user.id, email: user.email };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      } else {
        throw new UnauthorizedException();
      }
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
