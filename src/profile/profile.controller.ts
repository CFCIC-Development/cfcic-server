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
import {
  ProfileCreationDto,
  ProfileCreationResponseDto,
} from './profile.types';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':userId')
  @UseGuards(JwtGuard)
  async getProfile(@Param('userId') userId: string): Promise<any> {
    return await this.profileService.fetchUserProfileById({ id: userId });
  }

  @ApiBody({ type: ProfileCreationDto })
  @ApiResponse({
    status: 201,
    description: 'The profile has been successfully created.',
    type: ProfileCreationResponseDto,
  })
  @Post('/create')
  @UseGuards(JwtGuard)
  async createProfile(
    @Req()
    req: any,
    @Body() createProfileDto: ProfileCreationDto,
  ): Promise<any> {
    const userId = req.user.id;
    console.log(userId);
    return await this.profileService.createUserProfile(
      createProfileDto,
      userId,
    );
  }
}
