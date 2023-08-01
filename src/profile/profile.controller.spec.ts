import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { PrismaService } from '../prisma-module/prisma.service';
import { ProfileService } from './profile.service';
import { JwtGuard } from '../auth/guard';

describe('ProfileController', () => {
  let controller: ProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [ProfileService, PrismaService, JwtGuard],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
