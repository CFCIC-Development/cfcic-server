import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-module/prisma.service';
import { DependentCreationDto } from './dependent.types';

@Injectable()
export class DependentService {
  constructor(private readonly prismaService: PrismaService) {}

  async getDependentsByUserId(userId: string): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        profile: {
          select: {
            dependents: true,
          },
        },
      },
    });
    return user.profile.dependents;
  }

  async createDependents(data: DependentCreationDto[]): Promise<any> {
    const dependents = await this.prismaService.dependent.createMany({
      data: data,
      skipDuplicates: true,
    });

    if (dependents) {
      return HttpStatus.CREATED;
    }
  }
}
