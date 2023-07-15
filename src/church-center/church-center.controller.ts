import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ChurchCenterService } from './church-center.service';
import { ChurchCenterCreationDto } from './church-center.types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Church Center')
@Controller('church-center')
export class ChurchCenterController {
  constructor(private readonly churchCenterService: ChurchCenterService) {}

  @Get()
  async getAllChurchCenters() {
    return await this.churchCenterService.fetchAllChurchCenters();
  }

  @Get(':id')
  async getChurchCenterById(@Param('id') id: number) {
    return await this.churchCenterService.fetchChurchCenterById({ id: +id });
  }

  @Post()
  async createChurchCenters(@Body() data: ChurchCenterCreationDto) {
    return await this.churchCenterService.createChurchCenters(data);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteStoreById(@Param('id', ParseIntPipe) centerId: number) {
    return this.churchCenterService.deleteChurchCenterById(centerId);
  }
}
