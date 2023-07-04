import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { PrismaService } from '../prisma-module/prisma.service';
import { readFile } from 'fs/promises';
import * as path from 'path';

@Injectable()
export class ColonySeeder implements Seeder {
  constructor(private prismaService: PrismaService) {}

  async seed(): Promise<void> {
    const data = await readFile(
      path.join(__dirname, '../../entities/Colonies - CFCIC app.csv'),
      'utf8',
    );

    const coloniesArray = data.split('\r\n').slice(1);

    for (const colony of coloniesArray) {
      const existingCenter = await this.prismaService.colony.findFirst({
        where: { name: colony },
      });
      if (existingCenter) continue;

      await this.prismaService.colony.create({
        data: { name: colony },
      });
    }
  }

  async drop(): Promise<void> {
    return;
  }
}
