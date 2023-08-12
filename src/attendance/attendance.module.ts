import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { BullModule } from '@nestjs/bull';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email', // The name of the queue
    }),
    EmailModule,
  ],
  providers: [AttendanceService, EmailService],
  controllers: [AttendanceController],
})
export class AttendanceModule {}
