import { Test, TestingModule } from '@nestjs/testing';
import { ChurchArmService } from './church-arm.service';
import { PrismaService } from '../prisma-module/prisma.service';

describe('ChurchArmService', () => {
  let service: ChurchArmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChurchArmService, PrismaService],
    }).compile();

    service = module.get<ChurchArmService>(ChurchArmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
