import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import {
  AttendanceCreationDto,
  AttendanceUpdateDto,
  RegistrationDto,
} from './attendance.types';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IsOwnerGuard } from '../guards/is-owner.guard';
import { JwtGuard } from '../auth/guard';

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

  @ApiOperation({
    description:
      'Endpoint to get all registration details of a user for a all events',
  })
  @ApiParam({
    name: 'userId',
    description: 'User ID for which registration details are needed',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'All Registration data for user across all events. Returns an array of objects',
    type: [RegistrationDto],
  })
  @Get('/user/:userId')
  @UseGuards(JwtGuard)
  async getAttendanceByUser(@Param('userId') userId: string) {
    const attendance = await this.attendanceService.getAttendanceByUserId(
      userId,
    );
    return attendance;
  }

  @ApiOperation({
    description:
      'Endpoint to get registration details of a user for a specific event',
  })
  @ApiParam({
    name: 'eventId',
    description: 'Event ID for which registration details are needed',
  })
  @ApiParam({
    name: 'userId',
    description: 'User ID for which registration details are needed',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Registration data for user for given event',
    type: RegistrationDto,
  })
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
  async createAttendance(@Body() data: AttendanceCreationDto, @Req() req) {
    const loggedInUser = req.user;
    data = {
      ...data,
      user: loggedInUser,
    };
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
