import { Test, TestingModule } from '@nestjs/testing';
import { ServiceTeamController } from './service-team.controller';

describe('ServiceTeamController', () => {
  let controller: ServiceTeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceTeamController],
    }).compile();

    controller = module.get<ServiceTeamController>(ServiceTeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
