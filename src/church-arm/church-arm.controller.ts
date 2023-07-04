import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChurchArmService } from './church-arm.service';
import { ChurchArmsCreationDto } from './church-arm.types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Church Arm')
@Controller('church-arm')
export class ChurchArmController {
  constructor(private readonly churchArmService: ChurchArmService) {}

  @Get()
  async getAllChurchArms() {
    return await this.churchArmService.getAllChurchArms();
  }

  @Get(':id')
  async getChurchArmById(@Param('id') id: number) {
    return await this.churchArmService.getChurchArmById({ id: +id });
  }

  @Post()
  async createChurchArms(
    @Body('names') saveChurchArmsDto: ChurchArmsCreationDto,
  ) {
    return await this.churchArmService.createChurchArms(saveChurchArmsDto);
  }
}
