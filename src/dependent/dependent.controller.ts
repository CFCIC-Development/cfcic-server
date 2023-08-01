import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DependentService } from './dependent.service';
import { DependentCreationDto } from './dependent.types';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';

@ApiTags('Dependent')
@Controller('dependent')
export class DependentController {
  constructor(private readonly dependentService: DependentService) {}

  @Get(':userId')
  @UseGuards(JwtGuard)
  async getMyDependents(@Param('userId') userId: string) {
    return await this.dependentService.getDependentsByUserId(userId);
  }

  @Post()
  @UseGuards(JwtGuard)
  async createDependent(@Body() saveDependentDto: DependentCreationDto[]) {
    return await this.dependentService.createDependents(saveDependentDto);
  }
}
