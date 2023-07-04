import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { HomeCellsCreationDto } from './home-cell.types';

@Injectable()
export class HomeCellService {
  constructor(private readonly prismaService: PrismaService) {}

  async fetchAllHomeCells() {
    return await this.prismaService.homeCell.findMany();
  }

  async fetchHomeCellByLocation({ location }: { location: string }) {
    return await this.prismaService.homeCell.findMany({
      where: { location: location },
    });
  }

  async createHomeCells(data: HomeCellsCreationDto) {
    const homeCells = await this.prismaService.homeCell.createMany({
      data: data.cells,
    });

    if (homeCells) {
      return { message: 'Home cells created successfully' };
    }
  }
}
