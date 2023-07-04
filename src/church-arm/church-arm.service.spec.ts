import { Test, TestingModule } from '@nestjs/testing';
import { ChurchArmService } from './church-arm.service';

describe('ChurchArmService', () => {
  let service: ChurchArmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChurchArmService],
    }).compile();

    service = module.get<ChurchArmService>(ChurchArmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
