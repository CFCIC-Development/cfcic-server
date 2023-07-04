import { Test, TestingModule } from '@nestjs/testing';
import { WalkInService } from './walk-in.service';

describe('WalkInService', () => {
  let service: WalkInService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalkInService],
    }).compile();

    service = module.get<WalkInService>(WalkInService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
