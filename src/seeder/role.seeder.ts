import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { PrismaService } from '../prisma-module/prisma.service';
import { readFile } from 'fs/promises';
import * as path from 'path';

@Injectable()
export class RoleSeeder implements Seeder {
  constructor(private prismaService: PrismaService) {}

  async seed(): Promise<void> {
    const data = await readFile(
      path.join(__dirname, '../../entities/Church Roles - CFCIC app.csv'),
      'utf8',
    );

    const rolesArray = data.split('\r\n').slice(1);

    for (const role of rolesArray) {
      const existingRole =
        await this.prismaService.rolesAndResponsibilities.findFirst({
          where: { name: role },
        });
      if (existingRole) continue;

      await this.prismaService.rolesAndResponsibilities.create({
        data: { name: role },
      });
    }
  }

  async drop(): Promise<void> {
    return;
  }
}
