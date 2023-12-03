import { IsString } from '@nestjs/class-validator';

export class AuthDto {
  @IsString()
  email: string;
  @IsString()
  password: string;
}
