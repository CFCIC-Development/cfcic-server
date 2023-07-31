import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { FacebookStrategy } from './facebook.strategy';
import { GoogleStrategy } from './google.strategy';
import { SessionSerializer } from './session.serializer';
import { AuthenticatedGuard } from './authenticated.guard';
import { PrismaModule } from 'src/prisma-module/prisma-module.module';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    PrismaModule,
    ConfigModule,
    JwtModule.register({}),
  ],
  providers: [
    FacebookStrategy,
    GoogleStrategy,
    SessionSerializer,
    AuthenticatedGuard,
    AuthService,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [FacebookStrategy, GoogleStrategy, AuthenticatedGuard],
})
export class AuthModule {}
