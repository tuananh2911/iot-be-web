import { InjectRepository } from '@nestjs/typeorm';
import { Trees } from './entities/trees.entity';
import { Repository } from 'typeorm';

export class TreesService {
  constructor(
    @InjectRepository(Trees)
    private treesRepository: Repository<Trees>,
  ) {}
  async getAll(): Promise<Trees[]> {
    return await this.treesRepository.find();
  }
  async getAllNameImage(): Promise<Trees[]> {
    return await this.treesRepository.find();
  }

  async getDetailTree(id: string) {
    return await this.treesRepository.findOneBy({ id });
  }
}
