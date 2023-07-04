import { Module } from '@nestjs/common';
import { ServiceTeamService } from './service-team.service';
import { ServiceTeamController } from './service-team.controller';

@Module({
  imports: [],
  providers: [ServiceTeamService],
  controllers: [ServiceTeamController],
})
export class ServiceTeamModule {}
