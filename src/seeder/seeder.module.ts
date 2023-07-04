import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma-module/prisma-module.module';

@Module({
  imports: [PrismaModule],
})
export class SeederModule {}
