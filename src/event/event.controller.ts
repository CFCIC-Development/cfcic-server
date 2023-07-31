import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import {
  EventCreationDto,
  EventResponseDto,
  EventUpdateDto,
} from './event.types';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiResponse({
    status: 200,
    description: 'The events have been successfully fetched.',
    type: EventResponseDto,
    isArray: true, // Set this to true to indicate that the response is an array
  })
  @Get()
  async getAllEvents() {
    const events = await this.eventService.getAllEvents();
    return events;
  }

  @ApiResponse({
    status: 200,
    description: 'The event has been successfully fetched.',
    type: EventResponseDto,
  })
  @Get(':id')
  async getEventById(@Param('id') id: string) {
    const event = await this.eventService.getEventById(id);
    return event;
  }

  @ApiBody({ type: EventCreationDto })
  @ApiResponse({
    status: 201,
    description: 'The event has been successfully created.',
    type: EventResponseDto,
  })
  @Post()
  @UseGuards(JwtGuard)
  async createEvent(@Body() data: EventCreationDto) {
    const event = await this.eventService.createEvent(data);
    return event;
  }

  @ApiBody({ type: EventUpdateDto })
  @ApiResponse({
    status: 200,
    description: 'The event has been successfully updated.',
    type: EventResponseDto,
  })
  @Put(':id')
  @UseGuards(JwtGuard)
  async updateEvent(@Param('id') id: string, @Body() data: EventUpdateDto) {
    const event = await this.eventService.updateEventById(id, {
      ...data,
    });
    return event;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The event has been successfully deleted.',
  })
  @Delete(':id')
  @UseGuards(JwtGuard)
  deleteStoreById(@Param('id') eventId: string) {
    return this.eventService.deleteEventById(eventId);
  }
}
