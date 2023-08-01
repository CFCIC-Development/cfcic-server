import { Test, TestingModule } from '@nestjs/testing';
import { ChurchArmController } from './church-arm.controller';
import { PrismaService } from '../prisma-module/prisma.service';
import { ChurchArmService } from './church-arm.service';

describe('ChurchArmController', () => {
  let controller: ChurchArmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChurchArmController],
      providers: [ChurchArmService, PrismaService],
    }).compile();

    controller = module.get<ChurchArmController>(ChurchArmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
