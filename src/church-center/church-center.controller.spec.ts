import { Test, TestingModule } from '@nestjs/testing';
import { ChurchCenterController } from './church-center.controller';
import { PrismaService } from '../prisma-module/prisma.service';
import { ChurchCenterService } from './church-center.service';

describe('ChurchCenterController', () => {
  let controller: ChurchCenterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChurchCenterController],
      providers: [ChurchCenterService, PrismaService],
    }).compile();

    controller = module.get<ChurchCenterController>(ChurchCenterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
