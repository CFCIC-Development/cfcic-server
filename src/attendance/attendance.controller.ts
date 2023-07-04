import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceCreationDto, AttendanceUpdateDto } from './attendance.types';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { IsOwnerGuard } from 'src/guards/is-owner.guard';

@ApiTags('Attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get('/event/:eventId')
  @UseGuards(AuthenticatedGuard)
  async getAttendanceByEvent(@Param('eventId') eventId: string) {
    const attendance = await this.attendanceService.getAttendanceByEventId(
      eventId,
    );
    return attendance;
  }

  @Get('/user/:userId')
  @UseGuards(AuthenticatedGuard)
  async getAttendanceByUser(@Param('userId') userId: string) {
    const attendance = await this.attendanceService.getAttendanceByUserId(
      userId,
    );
    return attendance;
  }

  @Get(':eventId/:userId')
  @UseGuards(AuthenticatedGuard, IsOwnerGuard)
  async getUserEventAttendance(
    @Param() params: { eventId: string; userId: string },
  ) {
    const { eventId, userId } = params;
    return await this.attendanceService.getUserEventAttendance(eventId, userId);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        user_id: { type: 'string' },
        event_id: { type: 'string' },
        in_person: { type: 'boolean' },
        services_required: {
          type: 'array',
          items: {
            type: 'number',
            format: 'int32',
          },
        },
        dates_attending: {
          type: 'array',
          items: {
            type: 'string',
            format: 'date-time',
          },
        },
        existing_dependents: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              dependent_id: { type: 'string' },
            },
          },
        },
        new_dependents: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              first_name: { type: 'string' },
              last_name: { type: 'string' },
              birthday: { type: 'string', format: 'date-time' },
              allergies: { type: 'string' },
              emergency_contact: { type: 'string' },
            },
          },
        },
      },
    },
  })
  @ApiConsumes('application/json')
  @Post()
  @UseGuards(AuthenticatedGuard)
  async createAttendance(@Body() data: AttendanceCreationDto) {
    const attendance = await this.attendanceService.createAttendance(data);
    return attendance;
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        in_person: { type: 'boolean' },
        services_required: {
          type: 'array',
          items: {
            type: 'number',
            format: 'int32',
          },
        },
        dates_attending: {
          type: 'array',
          items: {
            type: 'string',
            format: 'date-time',
          },
        },
        new_dependents: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              first_name: { type: 'string' },
              last_name: { type: 'string' },
              birthday: { type: 'string', format: 'date-time' },
              allergies: { type: 'string' },
              emergency_contact: { type: 'string' },
            },
          },
        },
        add_existing_dependents: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              dependent_id: { type: 'string' },
            },
          },
        },
        remove_existing_dependents: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              dependent_id: { type: 'string' },
            },
          },
        },
      },
    },
  })
  @ApiConsumes('application/json')
  @Patch(':id')
  @UseGuards(AuthenticatedGuard)
  async updateAttendance(
    @Param('id') id: number,
    @Body() data: AttendanceUpdateDto,
  ) {
    const attendance = await this.attendanceService.updateAttendance(+id, data);
    return attendance;
  }
}
