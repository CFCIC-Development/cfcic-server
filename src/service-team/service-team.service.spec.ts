import { Test, TestingModule } from '@nestjs/testing';
import { ServiceTeamService } from './service-team.service';
import { PrismaService } from '../prisma-module/prisma.service';

describe('ServiceTeamService', () => {
  let service: ServiceTeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceTeamService, PrismaService],
    }).compile();

    service = module.get<ServiceTeamService>(ServiceTeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
