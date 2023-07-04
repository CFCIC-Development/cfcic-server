import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { PrismaService } from '../prisma-module/prisma.service';
import { readFile } from 'fs/promises';
import * as path from 'path';

@Injectable()
export class ServiceTeamSeeder implements Seeder {
  constructor(private prismaService: PrismaService) {}

  async seed(): Promise<void> {
    const data = await readFile(
      path.join(__dirname, '../../entities/Service Teams.csv'),
      'utf8',
    );

    const serviceTeams = data.split('\r\n').slice(1);

    for (const team of serviceTeams) {
      const existingTeam = await this.prismaService.serviceTeam.findFirst({
        where: { name: team },
      });
      if (existingTeam) continue;

      await this.prismaService.serviceTeam.create({
        data: { name: team },
      });
    }
  }

  async drop(): Promise<void> {
    return;
  }
}
