import { Test, TestingModule } from '@nestjs/testing';
import { DependentController } from './dependent.controller';
import { DependentService } from './dependent.service';
import { PrismaService } from '../prisma-module/prisma.service';
import { JwtGuard } from '../auth/guard';

describe('DependentController', () => {
  let controller: DependentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DependentController],
      providers: [DependentService, PrismaService, JwtGuard],
    }).compile();

    controller = module.get<DependentController>(DependentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
