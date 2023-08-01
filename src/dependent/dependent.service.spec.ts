import { Test, TestingModule } from '@nestjs/testing';
import { DependentService } from './dependent.service';
import { JwtGuard } from '../auth/guard';
import { PrismaService } from '../prisma-module/prisma.service';

describe('DependentService', () => {
  let service: DependentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DependentService, PrismaService, JwtGuard],
    }).compile();

    service = module.get<DependentService>(DependentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
