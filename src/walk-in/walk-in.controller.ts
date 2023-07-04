import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { WalkInService } from './walk-in.service';
import { CreateWalkInFormDto } from './walk-in.types';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@ApiTags('Walk In')
@Controller('walk-in')
export class WalkInController {
  constructor(private readonly walkInService: WalkInService) {}

  @Get(':eventId')
  @UseGuards(AuthenticatedGuard)
  async getEventWalkIns(@Param('eventId') eventId: string): Promise<any> {
    return await this.walkInService.getEventWalkIns(eventId);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        phone_number: { type: 'string' },
        email: { type: 'string' },
        is_church_member: { type: 'boolean' },
        how_heard_about_program: { type: 'string' },
        is_partner: { type: 'boolean' },
      },
    },
  })
  @Post(':eventId')
  @UseGuards(AuthenticatedGuard)
  async createWalkIn(
    @Param('eventId') eventId: string,
    @Body() input: CreateWalkInFormDto,
  ): Promise<any> {
    return await this.walkInService.createWalkIn({
      ...input,
      event_id: eventId,
    });
  }
}
