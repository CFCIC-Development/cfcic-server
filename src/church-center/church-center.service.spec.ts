import { Test, TestingModule } from '@nestjs/testing';
import { ChurchCenterService } from './church-center.service';

describe('ChurchCenterService', () => {
  let service: ChurchCenterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChurchCenterService],
    }).compile();

    service = module.get<ChurchCenterService>(ChurchCenterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
