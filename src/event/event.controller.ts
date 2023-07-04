import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventCreationDto, EventUpdateDto } from './event.types';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async getAllEvents() {
    const events = await this.eventService.getAllEvents();
    return events;
  }

  @Get(':id')
  async getEventById(@Param('id') id: string) {
    const event = await this.eventService.getEventById(id);
    return event;
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        tagline: { type: 'string' },
        banner_image: { type: 'string', format: 'binary' },
        start_date: { type: 'string', format: 'date-time' },
        end_date: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(FileInterceptor('banner_image'))
  async createEvent(
    @Body() data: EventCreationDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif)$/,
        })
        .addMaxSizeValidator({
          maxSize: 5_000_000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: true,
        }),
    )
    banner_image: Express.Multer.File,
  ) {
    const event = await this.eventService.createEvent({
      ...data,
      banner_image,
    });
    return event;
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        tagline: { type: 'string' },
        banner_image: { type: 'file', format: 'binary' },
        start_date: { type: 'string', format: 'date-time' },
        end_date: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(FileInterceptor('banner_image'))
  async updateEvent(
    @Param('id') id: string,
    @Body() data: EventUpdateDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif)$/,
        })
        .addMaxSizeValidator({
          maxSize: 5_000_000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false,
        }),
    )
    banner_image: Express.Multer.File,
  ) {
    const event = await this.eventService.updateEventById(id, {
      ...data,
      banner_image,
    });
    return event;
  }
}
