import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { PrismaService } from '../prisma-module/prisma.service';
import { readFile } from 'fs/promises';
import * as path from 'path';

@Injectable()
export class ChurchCenterSeeder implements Seeder {
  constructor(private prismaService: PrismaService) {}

  async seed(): Promise<void> {
    const data = await readFile(
      path.join(__dirname, '../../entities/Church Centres - CFCIC app.csv'),
      'utf8',
    );

    const centersArray = data.split('\r\n').slice(1);

    for (const center of centersArray) {
      const existingCenter = await this.prismaService.churchCentre.findFirst({
        where: { name: center },
      });
      if (existingCenter) continue;

      await this.prismaService.churchCentre.create({
        data: { name: center },
      });
    }
  }

  async drop(): Promise<void> {
    return;
  }
}
