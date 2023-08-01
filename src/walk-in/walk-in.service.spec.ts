import { Test, TestingModule } from '@nestjs/testing';
import { WalkInService } from './walk-in.service';
import { PrismaService } from '../prisma-module/prisma.service';
import { JwtGuard } from '../auth/guard';

describe('WalkInService', () => {
  let service: WalkInService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalkInService, JwtGuard, PrismaService],
    }).compile();

    service = module.get<WalkInService>(WalkInService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
