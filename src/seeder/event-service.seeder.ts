import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { PrismaService } from '../prisma-module/prisma.service';

@Injectable()
export class EventServiceSeeder implements Seeder {
  constructor(private prismaService: PrismaService) {}

  async seed(): Promise<void> {
    const servicesArray = ['Transportation', 'Accommodation', 'Feeding'];

    for (const service of servicesArray) {
      const existingService = await this.prismaService.eventService.findFirst({
        where: { name: service },
      });
      if (existingService) continue;

      await this.prismaService.eventService.create({
        data: { name: service },
      });
    }
  }

  async drop(): Promise<void> {
    return;
  }
}
