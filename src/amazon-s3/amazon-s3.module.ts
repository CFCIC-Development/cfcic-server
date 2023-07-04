import { Global, Module } from '@nestjs/common';
import { AmazonS3Service } from './amazon-s3.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [AmazonS3Service],
  exports: [AmazonS3Service],
})
export class AmazonS3Module {}
