import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceCreationDto, AttendanceUpdateDto } from './attendance.types';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { IsOwnerGuard } from 'src/guards/is-owner.guard';
import { JwtGuard } from 'src/auth/guard';

@ApiTags('Attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get('/event/:eventId')
  @UseGuards(JwtGuard)
  async getAttendanceByEvent(@Param('eventId') eventId: string) {
    const attendance = await this.attendanceService.getAttendanceByEventId(
      eventId,
    );
    return attendance;
  }

  @Get('/user/:userId')
  @UseGuards(JwtGuard)
  async getAttendanceByUser(@Param('userId') userId: string) {
    const attendance = await this.attendanceService.getAttendanceByUserId(
      userId,
    );
    return attendance;
  }

  @Get(':eventId/:userId')
  @UseGuards(JwtGuard, IsOwnerGuard)
  async getUserEventAttendance(
    @Param() params: { eventId: string; userId: string },
  ) {
    const { eventId, userId } = params;
    return await this.attendanceService.getUserEventAttendance(eventId, userId);
  }

  @ApiBody({ type: AttendanceCreationDto })
  @ApiConsumes('application/json')
  @Post()
  @UseGuards(JwtGuard)
  async createAttendance(@Body() data: AttendanceCreationDto) {
    const attendance = await this.attendanceService.createAttendance(data);
    return attendance;
  }

  // @ApiBody({ type: AttendanceUpdateDto })
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
  @Put(':id')
  @UseGuards(JwtGuard)
  async updateAttendance(
    @Param('id') id: number,
    @Body() data: AttendanceUpdateDto,
  ) {
    const attendance = await this.attendanceService.updateAttendance(+id, data);
    return attendance;
  }
}
