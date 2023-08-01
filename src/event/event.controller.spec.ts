import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { JwtGuard } from '../auth/guard';
import { PrismaService } from '../prisma-module/prisma.service';
import { EventService } from './event.service';

describe('EventController', () => {
  let controller: EventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [EventService, PrismaService, JwtGuard],
    }).compile();

    controller = module.get<EventController>(EventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
