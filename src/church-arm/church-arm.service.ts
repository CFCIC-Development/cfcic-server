import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { ChurchArmsCreationDto } from './church-arm.types';

@Injectable()
export class ChurchArmService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllChurchArms() {
    return await this.prismaService.churchArm.findMany();
  }

  async getChurchArmById({ id }: { id: number }) {
    return await this.prismaService.churchArm.findUnique({
      where: { id: id },
    });
  }

  async createChurchArms(data: ChurchArmsCreationDto) {
    const churchArms = await this.prismaService.churchArm.createMany({
      data: data,
    });

    if (churchArms) {
      return { message: 'Church arms created successfully' };
    }
  }
}
