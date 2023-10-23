import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    public userRepository: Repository<User>,
  ) {}

  async findOne(username): Promise<User> {
    return await this.userRepository.findOneBy({ username: username });
  }
  async createUser(username: string, password: string): Promise<User> {
    const user: User = new User();
    user.username = username;
    user.password = password;
    return await this.userRepository.save(user);
  }
}
