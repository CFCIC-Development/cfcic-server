import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ProfileService } from './profile.service';
import { ProfileCreationDto } from './profile.types';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':userId')
  @UseGuards(AuthenticatedGuard)
  async getProfile(@Param('userId') userId: string): Promise<any> {
    return await this.profileService.fetchUserProfileById({ id: userId });
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phone_number: { type: 'string' },
        occupation: { type: 'string' },
        birthday: { type: 'string', format: 'date-time' },
        marital_status: { type: 'string' },
        marriage_anniversary: { type: `string`, format: 'date-time' },
        is_church_member: { type: 'boolean' },
        church_join_date: { type: `string`, format: 'date-time' },
        growth_track_completed: { type: 'boolean' },
        is_tither: { type: 'boolean' },
        is_partner: { type: 'boolean' },
        payment_interval: { type: 'string' },
        church_centre_id: { type: 'number', format: 'int32' },
        home_cell_id: { type: 'number', format: 'int32' },
        colony_id: { type: 'number', format: 'int32' },
        roles_and_responsibilities: {
          type: 'array',
          items: { type: 'number', format: 'int32' },
        },
        service_team: {
          type: 'array',
          items: { type: 'number', format: 'int32' },
        },
        partnered_arms: {
          type: 'array',
          items: { type: 'number', format: 'int32' },
        },
        dependents: {
          type: 'array',
          items: {
            title: 'Dependent',
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
  @Post('/create')
  @UseGuards(AuthenticatedGuard)
  async createProfile(
    @Req()
    req: any,
    @Body() createProfileDto: ProfileCreationDto,
  ): Promise<any> {
    const userId = req.user.id;
    return await this.profileService.createUserProfile(
      createProfileDto,
      userId,
    );
  }
}
