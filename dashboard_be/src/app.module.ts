import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/users.entity';
import { UsersService } from './users/users.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '103.77.246.226',
      port: 5433,
      username: 'postgres',
      password: '29112002',
      database: 'iot',
      entities: [User],
      synchronize: false,
    }),
    JwtModule.register({
      global: true,
      secret: 'iot',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, UsersService],
})
export class AppModule {}
