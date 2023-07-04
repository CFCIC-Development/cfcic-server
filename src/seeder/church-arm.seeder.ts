import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { PrismaService } from '../prisma-module/prisma.service';
import { readFile } from 'fs/promises';
import * as path from 'path';

@Injectable()
export class ChurchArmSeeder implements Seeder {
  constructor(private prismaService: PrismaService) {}

  async seed(): Promise<void> {
    const data = await readFile(
      path.join(__dirname, '../../entities/Partnership Arms.csv'),
      'utf8',
    );

    const arms = data.split('\r\n');
    const armsArray = arms.slice(1).map((arm) => {
      return arm.replaceAll('"', '');
    });

    for (const arm of armsArray) {
      const existingArm = await this.prismaService.churchArm.findFirst({
        where: { name: arm },
      });
      if (existingArm) continue;

      await this.prismaService.churchArm.create({
        data: { name: arm },
      });
    }
  }

  async drop(): Promise<void> {
    return;
  }
}
