import { Test, TestingModule } from '@nestjs/testing';
import { ServiceTeamService } from './service-team.service';

describe('ServiceTeamService', () => {
  let service: ServiceTeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceTeamService],
    }).compile();

    service = module.get<ServiceTeamService>(ServiceTeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
