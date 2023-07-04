import { Module } from '@nestjs/common';
import { ChurchArmService } from './church-arm.service';
import { ChurchArmController } from './church-arm.controller';

@Module({
  imports: [],
  providers: [ChurchArmService],
  controllers: [ChurchArmController],
})
export class ChurchArmModule {}
