import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-module/prisma.service';
import {
  EventCreationDto,
  EventUpdateAfterImgUploadDto,
  EventUpdateDto,
} from './event.types';
import { AmazonS3Service } from 'src/amazon-s3/amazon-s3.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EventService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly s3Service: AmazonS3Service,
    private readonly configService: ConfigService,
  ) {}

  async createEvent(data: EventCreationDto): Promise<any> {
    const fileUploaded = await this.s3Service.uploadFile(
      data.banner_image.buffer,
      data.banner_image.mimetype,
      this.configService.get<string>('BANNER_IMAGES_FOLDER'),
    );

    const bannerImagePath =
      this.configService.get<string>('BANNER_IMAGES_PATH_PREFIX') +
      fileUploaded;

    const event = await this.prismaService.event.create({
      data: {
        ...data,
        banner_image: bannerImagePath,
      },
    });
    return event;
  }

  async getEventById(id: string): Promise<any> {
    const event = await this.prismaService.event.findUnique({
      where: {
        id,
      },
    });
    return event;
  }

  async getAllEvents(): Promise<any> {
    const events = await this.prismaService.event.findMany();
    return events;
  }

  async updateEventById(id: string, data: EventUpdateDto): Promise<any> {
    let bannerImagePath: string;
    let updateData: unknown = data as EventUpdateDto;

    if (data.banner_image) {
      const fileUploaded = await this.s3Service.uploadFile(
        data.banner_image.buffer,
        data.banner_image.mimetype,
        this.configService.get<string>('BANNER_IMAGES_FOLDER'),
      );

      bannerImagePath =
        this.configService.get<string>('BANNER_IMAGES_PATH_PREFIX') +
        fileUploaded;
      updateData = {
        ...data,
        banner_image: bannerImagePath,
      } as EventUpdateAfterImgUploadDto;
    }

    const event = await this.prismaService.event.update({
      where: {
        id,
      },
      data: updateData,
    });
    return event;
  }
}
