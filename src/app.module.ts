import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma-module/prisma-module.module';
import { PrismaService } from './prisma-module/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { HomeCellModule } from './home-cell/home-cell.module';
import { ServiceTeamModule } from './service-team/service-team.module';
import { ChurchCenterModule } from './church-center/church-center.module';
import { ColonyModule } from './colony/colony.module';
import { DependentModule } from './dependent/dependent.module';
import { RoleModule } from './role/role.module';
import { ChurchArmModule } from './church-arm/church-arm.module';
import { AmazonS3Module } from './amazon-s3/amazon-s3.module';
import { EventModule } from './event/event.module';
import { AttendanceModule } from './attendance/attendance.module';
import { WalkInModule } from './walk-in/walk-in.module';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot(),
    AuthModule,
    ProfileModule,
    HomeCellModule,
    ServiceTeamModule,
    ChurchCenterModule,
    ColonyModule,
    DependentModule,
    RoleModule,
    ChurchArmModule,
    AmazonS3Module,
    EventModule,
    AttendanceModule,
    WalkInModule,
    EmailModule,
    BullModule.registerQueue({
      name: 'email', // The name of the queue
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, EmailService],
})
export class AppModule {}
