import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceController } from './attendance.controller';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { JwtGuard } from '../auth/guard';
import { IsOwnerGuard } from '../guards/is-owner.guard';
import { AttendanceService } from './attendance.service';
import { PrismaService } from '../prisma-module/prisma.service';

describe('AttendanceController', () => {
  let controller: AttendanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttendanceController],
      providers: [
        AttendanceService,
        PrismaService,
        AuthenticatedGuard,
        JwtGuard,
        IsOwnerGuard,
      ],
    }).compile();

    controller = module.get<AttendanceController>(AttendanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
