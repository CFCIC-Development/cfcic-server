import { Test, TestingModule } from '@nestjs/testing';
import { HomeCellService } from './home-cell.service';

describe('HomeCellService', () => {
  let service: HomeCellService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeCellService],
    }).compile();

    service = module.get<HomeCellService>(HomeCellService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
