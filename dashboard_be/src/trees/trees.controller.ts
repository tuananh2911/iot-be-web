import { Controller, Get, Param, Version } from '@nestjs/common';
import { TreesService } from './trees.service';
import { Trees } from './entities/trees.entity';

@Controller('trees')
export class TreesController {
  constructor(private treesService: TreesService) {}
  @Version('1')
  @Get('name-image')
  async getAllNameImageTree(): Promise<Trees[]> {
    return await this.treesService.getAllNameImage();
  }
  @Version('1')
  @Get(':id')
  async getTree(@Param() id: string): Promise<Trees> {
    return await this.treesService.getDetailTree(id);
  }
}
