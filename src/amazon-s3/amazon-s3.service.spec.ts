import { Test, TestingModule } from '@nestjs/testing';
import { AmazonS3Service } from './amazon-s3.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('AmazonS3Service', () => {
  let service: AmazonS3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()], // Add the ConfigModule here
      providers: [AmazonS3Service, ConfigService], // Add ConfigService to providers
    }).compile();

    service = module.get<AmazonS3Service>(AmazonS3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
