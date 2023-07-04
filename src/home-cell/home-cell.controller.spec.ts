import { Test, TestingModule } from '@nestjs/testing';
import { HomeCellController } from './home-cell.controller';

describe('HomeCellController', () => {
  let controller: HomeCellController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeCellController],
    }).compile();

    controller = module.get<HomeCellController>(HomeCellController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
