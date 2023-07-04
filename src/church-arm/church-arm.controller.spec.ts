import { Test, TestingModule } from '@nestjs/testing';
import { ChurchArmController } from './church-arm.controller';

describe('ChurchArmController', () => {
  let controller: ChurchArmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChurchArmController],
    }).compile();

    controller = module.get<ChurchArmController>(ChurchArmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
