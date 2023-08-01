import { Test, TestingModule } from '@nestjs/testing';
import { WalkInController } from './walk-in.controller';
import { JwtGuard } from '../auth/guard';
import { PrismaService } from '../prisma-module/prisma.service';
import { WalkInService } from './walk-in.service';

describe('WalkInController', () => {
  let controller: WalkInController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalkInController],
      providers: [WalkInService, JwtGuard, PrismaService],
    }).compile();

    controller = module.get<WalkInController>(WalkInController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
