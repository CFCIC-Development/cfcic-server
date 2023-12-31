import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-module/prisma.service';
import { EventCreationDto, EventUpdateDto } from './event.types';

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService) {}

  async createEvent(data: EventCreationDto): Promise<any> {
    const event = await this.prismaService.event.create({
      data: {
        ...data,
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
    const event = await this.prismaService.event.update({
      where: {
        id,
      },
      data,
    });
    return event;
  }

  async deleteEventById(eventId: string) {
    await this.prismaService.event.delete({
      where: {
        id: eventId,
      },
    });

    return {
      message: 'Successfully deleted Event',
    };
  }
}
