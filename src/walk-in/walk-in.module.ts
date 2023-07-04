import { Module } from '@nestjs/common';
import { WalkInController } from './walk-in.controller';
import { WalkInService } from './walk-in.service';

@Module({
  imports: [],
  controllers: [WalkInController],
  providers: [WalkInService],
})
export class WalkInModule {}
