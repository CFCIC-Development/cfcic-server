import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email', // The name of the queue
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
