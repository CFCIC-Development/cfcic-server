import { Module } from '@nestjs/common';
import { ChurchCenterService } from './church-center.service';
import { ChurchCenterController } from './church-center.controller';

@Module({
  imports: [],
  providers: [ChurchCenterService],
  controllers: [ChurchCenterController],
})
export class ChurchCenterModule {}
