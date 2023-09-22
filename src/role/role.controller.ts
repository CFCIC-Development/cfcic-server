import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { RolesCreationDto } from './role.types';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegistrationDto } from 'src/attendance/attendance.types';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({
    description: 'Endpoint to get all users on system',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All users. Returns an array of objects',
    type: [RegistrationDto],
  })
  @Get('/user')
  async getAllUsers() {
    return await this.roleService.getAllUsers();
  }

  @ApiOperation({
    description: 'Endpoint to get a user on system',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID for which details are needed',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A user data',
    type: [RegistrationDto],
  })
  @Get('/user/:id')
  async getUserById(@Param('id') id: string) {
    return await this.roleService.getUserById({ id: id });
  }

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
