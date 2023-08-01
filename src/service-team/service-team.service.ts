import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-module/prisma.service';
import { ServiceTeamsCreationDto } from './service-team.types';

@Injectable()
export class ServiceTeamService {
  constructor(private readonly prismaService: PrismaService) {}

  async fetchAllServiceTeams() {
    return await this.prismaService.serviceTeam.findMany();
  }

  async fetchServiceTeamById({ id }: { id: number }) {
    return await this.prismaService.serviceTeam.findUnique({
      where: { id: id },
    });
  }

  async createServiceTeams(data: ServiceTeamsCreationDto) {
    const serviceTeams = await this.prismaService.serviceTeam.createMany({
      data: data.teams,
    });

    if (serviceTeams) {
      return { message: 'Service teams created successfully' };
    }
  }
}
