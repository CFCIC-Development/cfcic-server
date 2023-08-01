import { Test, TestingModule } from '@nestjs/testing';
import { HomeCellController } from './home-cell.controller';
import { PrismaService } from '../prisma-module/prisma.service';
import { HomeCellService } from './home-cell.service';

describe('HomeCellController', () => {
  let controller: HomeCellController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeCellController],
      providers: [HomeCellService, PrismaService],
    }).compile();

    controller = module.get<HomeCellController>(HomeCellController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
