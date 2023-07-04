import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-module/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async getLoggedInUser(id: string) {
    return await this.prismaService.user.findUnique({ where: { id } });
  }
}
