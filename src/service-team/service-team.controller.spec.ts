import { Test, TestingModule } from '@nestjs/testing';
import { ServiceTeamController } from './service-team.controller';
import { PrismaService } from '../prisma-module/prisma.service';
import { ServiceTeamService } from './service-team.service';

describe('ServiceTeamController', () => {
  let controller: ServiceTeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceTeamController],
      providers: [ServiceTeamService, PrismaService],
    }).compile();

    controller = module.get<ServiceTeamController>(ServiceTeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
