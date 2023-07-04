import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { ChurchCenterCreationDto } from './church-center.types';

@Injectable()
export class ChurchCenterService {
  constructor(private readonly prismaService: PrismaService) {}

  async fetchAllChurchCenters() {
    return await this.prismaService.churchCentre.findMany();
  }

  async fetchChurchCenterById({ id }: { id: number }) {
    return await this.prismaService.churchCentre.findUnique({
      where: { id: id },
    });
  }

  async createChurchCenters(data: ChurchCenterCreationDto) {
    const churchCenters = await this.prismaService.churchCentre.createMany({
      data: data.names,
    });

    if (churchCenters) {
      return { message: 'Church Centers created successfully' };
    }
  }
}
