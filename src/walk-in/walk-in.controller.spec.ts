import { Test, TestingModule } from '@nestjs/testing';
import { WalkInController } from './walk-in.controller';

describe('WalkInController', () => {
  let controller: WalkInController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalkInController],
    }).compile();

    controller = module.get<WalkInController>(WalkInController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
