import { Test, TestingModule } from '@nestjs/testing';
import { ColonyService } from './colony.service';
import { PrismaService } from '../prisma-module/prisma.service';

describe('ColonyService', () => {
  let service: ColonyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColonyService, PrismaService],
    }).compile();

    service = module.get<ColonyService>(ColonyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
