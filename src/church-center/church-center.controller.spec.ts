import { Test, TestingModule } from '@nestjs/testing';
import { ChurchCenterController } from './church-center.controller';

describe('ChurchCenterController', () => {
  let controller: ChurchCenterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChurchCenterController],
    }).compile();

    controller = module.get<ChurchCenterController>(ChurchCenterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
