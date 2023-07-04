import { Test, TestingModule } from '@nestjs/testing';
import { DependentController } from './dependent.controller';

describe('DependentController', () => {
  let controller: DependentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DependentController],
    }).compile();

    controller = module.get<DependentController>(DependentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
