import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ServiceTeamService } from './service-team.service';
import { ServiceTeamsCreationDto } from './service-team.types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Service Team')
@Controller('service-team')
export class ServiceTeamController {
  constructor(private readonly serviceTeamService: ServiceTeamService) {}

  @Get()
  async getAllServiceTeams() {
    return await this.serviceTeamService.fetchAllServiceTeams();
  }

  @Get(':id')
  async getServiceTeamById(@Param('id') id: number) {
    return await this.serviceTeamService.fetchServiceTeamById({ id: +id });
  }

  @Post()
  async createServiceTeams(
    @Body('names') saveServiceTeamsDto: ServiceTeamsCreationDto,
  ) {
    return await this.serviceTeamService.createServiceTeams(
      saveServiceTeamsDto,
    );
  }
}
