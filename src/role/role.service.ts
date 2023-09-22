import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-module/prisma.service';
import { RolesCreationDto } from './role.types';

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers() {
    return await this.prismaService.user.findMany();
  }

  async getUserById({ id }: { id: string }) {
    return await this.prismaService.user.findUnique({
      where: { id: id },
    });
  }

  async getAllRoles() {
    return await this.prismaService.rolesAndResponsibilities.findMany();
  }

  async getRoleById({ id }: { id: number }) {
    return await this.prismaService.rolesAndResponsibilities.findUnique({
      where: { id: id },
    });
  }

  async createRoles(data: RolesCreationDto) {
    return await this.prismaService.rolesAndResponsibilities.createMany({
      data: data.roles,
    });
  }
}
