import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { IsOwnerGuard } from '../guards/is-owner.guard';
import { PrismaService } from '../prisma-module/prisma.service';
import { AuthenticatedGuard } from './authenticated.guard';
import { JwtGuard } from './guard';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()], // Add the ConfigModule here
      controllers: [AuthController],
      providers: [
        AuthService,
        PrismaService,
        AuthenticatedGuard,
        JwtGuard,
        IsOwnerGuard,
        JwtService, // Include JwtService in providers
        ConfigService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
