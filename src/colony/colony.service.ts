import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-module/prisma.service';
import { ColonyCreationDto } from './colony.types';

@Injectable()
export class ColonyService {
  constructor(private readonly prismaService: PrismaService) {}

  async fetchAllColonies() {
    return await this.prismaService.colony.findMany();
  }

  async fetchColonyById({ id }: { id: number }) {
    return await this.prismaService.colony.findUnique({
      where: { id: id },
    });
  }

  async createColonies(data: ColonyCreationDto) {
    const colonies = await this.prismaService.colony.createMany({
      data: data.names,
    });

    if (colonies) {
      return { message: 'Colonies created successfully' };
    }
  }
}
