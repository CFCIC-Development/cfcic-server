import { Module } from '@nestjs/common';
import { HomeCellService } from './home-cell.service';
import { HomeCellController } from './home-cell.controller';

@Module({
  imports: [],
  providers: [HomeCellService],
  controllers: [HomeCellController],
})
export class HomeCellModule {}
