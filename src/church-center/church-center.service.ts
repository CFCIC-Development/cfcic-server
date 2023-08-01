import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-module/prisma.service';
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
    try {
      const churchCenters = await this.prismaService.churchCentre.createMany({
        data: data.names,
      });

      if (churchCenters) {
        return { message: 'Church Centers created successfully' };
      }
    } catch (error) {
      if (error) {
        console.log('Error message:', error.message);
        if (error.code === 'P2002') {
          console.log(
            `A unique constraint error occurred: ${error.meta.target}`,
          );
          throw new ForbiddenException('Centers With Such Names Already Exist');
        }
      }
      throw error;
    }
  }

  async deleteChurchCenterById(centerId: number) {
    await this.prismaService.churchCentre.delete({
      where: {
        id: centerId,
      },
    });

    return {
      message: 'Center successfully deleted',
    };
  }
}
