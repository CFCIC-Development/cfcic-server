import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HomeCellService } from './home-cell.service';
import { HomeCellsCreationDto } from './home-cell.types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Home Cell')
@Controller('home-cell')
export class HomeCellController {
  constructor(private readonly homeCellService: HomeCellService) {}

  @Get()
  async getAllHomeCells() {
    return await this.homeCellService.fetchAllHomeCells();
  }

  @Get(':location')
  async getHomeCellByLocation(@Param('location') location: string) {
    return await this.homeCellService.fetchHomeCellByLocation({ location });
  }

  @Post()
  async createHomeCells(
    @Body('homeCells') saveHomeCellsDto: HomeCellsCreationDto,
  ) {
    return await this.homeCellService.createHomeCells(saveHomeCellsDto);
  }
}
