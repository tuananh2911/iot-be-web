import { Injectable } from '@nestjs/common';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    public userRepository: Repository<User>,
  ) {}

  async findOne(email): Promise<User> {
    try {
      return await this.userRepository.findOneBy({ email: email });
    } catch (e) {
      return null;
    }
  }
  async createUser(email: string, password: string): Promise<User> {
    const user: User = new User();
    user.email = email;
    user.password = password;
    return await this.userRepository.save(user);
  }
}
