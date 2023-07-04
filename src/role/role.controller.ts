import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { RolesCreationDto } from './role.types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getAllRoles() {
    return await this.roleService.getAllRoles();
  }

  @Get(':id')
  async getRoleById(@Param('id') id: number) {
    return await this.roleService.getRoleById({ id: +id });
  }

  @Post()
  async createRoles(@Body('names') saveRolesDto: RolesCreationDto) {
    return await this.roleService.createRoles(saveRolesDto);
  }
}
