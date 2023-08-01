import { Test, TestingModule } from '@nestjs/testing';
import { ColonyController } from './colony.controller';
import { ColonyService } from './colony.service';
import { JwtGuard } from '../auth/guard';
import { PrismaService } from '../prisma-module/prisma.service';

describe('ColonyController', () => {
  let controller: ColonyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColonyController],
      providers: [ColonyService, PrismaService, JwtGuard],
    }).compile();

    controller = module.get<ColonyController>(ColonyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
