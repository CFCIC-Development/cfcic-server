import { Test, TestingModule } from '@nestjs/testing';
import { HomeCellService } from './home-cell.service';
import { PrismaService } from '../prisma-module/prisma.service';

describe('HomeCellService', () => {
  let service: HomeCellService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeCellService, PrismaService],
    }).compile();

    service = module.get<HomeCellService>(HomeCellService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
