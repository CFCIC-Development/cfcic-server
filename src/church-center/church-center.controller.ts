import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChurchCenterService } from './church-center.service';
import { ChurchCenterCreationDto } from './church-center.types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Church Center')
@Controller('church-center')
export class ChurchCenterController {
  constructor(private readonly churchCenterService: ChurchCenterService) {}

  @Get()
  async getAllChurchCenters() {
    return await this.churchCenterService.fetchAllChurchCenters();
  }

  @Get(':id')
  async getChurchCenterById(@Param('id') id: number) {
    return await this.churchCenterService.fetchChurchCenterById({ id: +id });
  }

  @Post()
  async createChurchCenters(
    @Body('names') saveChurchCentersDto: ChurchCenterCreationDto,
  ) {
    return await this.churchCenterService.createChurchCenters(
      saveChurchCentersDto,
    );
  }
}
