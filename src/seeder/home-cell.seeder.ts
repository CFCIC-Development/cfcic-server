import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { PrismaService } from '../prisma-module/prisma.service';
import { readFile } from 'fs/promises';
import * as path from 'path';

@Injectable()
export class HomeCellSeeder implements Seeder {
  constructor(private prismaService: PrismaService) {}

  async seed(): Promise<void> {
    const data = await readFile(
      path.join(__dirname, '../../entities/Home Cells - CFCIC app.csv'),
      'utf8',
    );

    const homeCellsArray = data.split('\r\n').slice(2);
    const homeCellsObjectArray = homeCellsArray.map((homeCell) => {
      const [name, location] = homeCell.split(',');
      return { name, location };
    });

    for (const cell of homeCellsObjectArray) {
      const existingCell = await this.prismaService.homeCell.findFirst({
        where: { name: cell.name, location: cell.location },
      });
      if (existingCell) continue;

      await this.prismaService.homeCell.create({
        data: { name: cell.name, location: cell.location },
      });
    }
  }

  async drop(): Promise<void> {
    return;
  }
}
