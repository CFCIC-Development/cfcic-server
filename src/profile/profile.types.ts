import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { DependentCreationFromParentDto } from 'src/dependent/dependent.types';

export type ProfileRolesAndResponsibilitiesType = number[];
export type ProfileServiceTeamsType = number[];
export type ProfileChurchArmsType = number[];

export class ProfileCreationDto {
  @IsNotEmpty()
  @Length(11, 13)
  @ApiProperty({ example: '0987654321' })
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'farmer' })
  occupation: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2023-08-17T18:00:00Z' })
  birthday: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'married' })
  marital_status: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2023-08-17T18:00:00Z' })
  marriage_anniversary: Date;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: true })
  is_church_member: boolean;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2023-08-17T18:00:00Z' })
  church_join_date: Date;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true })
  growth_track_completed: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true })
  is_tither: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true })
  is_partner: boolean;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @ApiProperty({ example: 'monthly' })
  payment_interval: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 897 })
  church_centre_id: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 897 })
  home_cell_id: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 897 })
  colony_id: number;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    example: [
      {
        first_name: 'joe',
        last_name: 'joe',
        birthday: '2013-08-17T18:00:00Z',
        allergies: 'pepper',
        emergency_contact: '0987654321',
      },
    ],
  })
  dependents: DependentCreationFromParentDto;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    example: [1],
  })
  roles_and_responsibilities: ProfileRolesAndResponsibilitiesType;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    example: [1],
  })
  service_team: ProfileServiceTeamsType;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    example: [1],
  })
  partnered_arms: ProfileChurchArmsType;
}

export class ProfileCreationResponseDto {
  @IsString()
  @ApiProperty({ example: '54a56733-6d73-4af2-8157-bfd229a3a7be' })
  id: string;

  @IsString()
  @ApiProperty({ example: '79305d55-b06a-4622-a67f-79000387d678' })
  userId: string;

  @ApiProperty({ example: '0987654321' })
  phone_number: string;

  @IsString()
  @ApiProperty({ example: 'farmer' })
  occupation: string;

  @IsDateString()
  @ApiProperty({ example: '2023-08-17T18:00:00Z' })
  birthday: string;

  @IsString()
  @ApiProperty({ example: 'married' })
  marital_status: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2023-08-17T18:00:00Z' })
  marriage_anniversary: Date;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: true })
  is_church_member: boolean;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2023-08-17T18:00:00Z' })
  church_join_date: Date;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true })
  growth_track_completed: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true })
  is_tither: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true })
  is_partner: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'monthly' })
  payment_interval: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 897 })
  church_centre_id: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 897 })
  home_cell_id: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 897 })
  colony_id: number;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    example: [
      {
        first_name: 'joe',
        last_name: 'joe',
        birthday: '2013-08-17T18:00:00Z',
        allergies: 'pepper',
        emergency_contact: '0987654321',
      },
    ],
  })
  dependents: DependentCreationFromParentDto;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    example: [1],
  })
  roles_and_responsibilities: ProfileRolesAndResponsibilitiesType;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    example: [1],
  })
  service_team: ProfileServiceTeamsType;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    example: [1],
  })
  partnered_arms: ProfileChurchArmsType;
}

export class RolesAndResp {
  role_responsibility: {
    connect: {
      id: number;
    };
  };
}

export class ServTeam {
  service_team: {
    connect: {
      id: number;
    };
  };
}

export class PartArm {
  church_arm: {
    connect: {
      id: number;
    };
  };
}
