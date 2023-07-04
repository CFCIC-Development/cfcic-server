import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DependentService } from './dependent.service';
import { DependentCreationDto } from './dependent.types';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dependent')
@Controller('dependent')
export class DependentController {
  constructor(private readonly dependentService: DependentService) {}

  @Get(':userId')
  @UseGuards(AuthenticatedGuard)
  async getMyDependents(@Param('userId') userId: string) {
    return await this.dependentService.getDependentsByUserId(userId);
  }

  @Post()
  @UseGuards(AuthenticatedGuard)
  async createDependent(@Body() saveDependentDto: DependentCreationDto[]) {
    return await this.dependentService.createDependents(saveDependentDto);
  }
}
