import { Module } from '@nestjs/common';
import { DependentService } from './dependent.service';
import { DependentController } from './dependent.controller';

@Module({
  imports: [],
  providers: [DependentService],
  controllers: [DependentController],
  exports: [DependentService],
})
export class DependentModule {}
