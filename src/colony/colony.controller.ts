import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ColonyService } from './colony.service';
import { ColonyCreationDto } from './colony.types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Colony')
@Controller('colony')
export class ColonyController {
  constructor(private readonly colonyService: ColonyService) {}

  @Get()
  async getAllColonies() {
    return await this.colonyService.fetchAllColonies();
  }

  @Get(':id')
  async getColonyById(@Param('id') id: number) {
    return await this.colonyService.fetchColonyById({ id: +id });
  }

  @Post()
  async createColonies(@Body('names') saveColoniesDto: ColonyCreationDto) {
    return await this.colonyService.createColonies(saveColoniesDto);
  }
}
