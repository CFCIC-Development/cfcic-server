import { Module } from '@nestjs/common';
import { ColonyService } from './colony.service';
import { ColonyController } from './colony.controller';

@Module({
  imports: [],
  providers: [ColonyService],
  controllers: [ColonyController],
})
export class ColonyModule {}
