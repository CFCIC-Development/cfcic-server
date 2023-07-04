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
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  occupation: string;

  @IsNotEmpty()
  @IsDateString()
  birthday: string;

  @IsNotEmpty()
  @IsString()
  marital_status: string;

  @IsOptional()
  @IsDateString()
  marriage_anniversary: Date;

  @IsNotEmpty()
  @IsBoolean()
  is_church_member: boolean;

  @IsOptional()
  @IsDateString()
  church_join_date: Date;

  @IsOptional()
  @IsBoolean()
  growth_track_completed: boolean;

  @IsOptional()
  @IsBoolean()
  is_tither: boolean;

  @IsOptional()
  @IsBoolean()
  is_partner: boolean;

  @IsOptional()
  @IsString()
  @MinLength(5)
  payment_interval: string;

  @IsOptional()
  @IsNumber()
  church_centre_id: number;

  @IsOptional()
  @IsNumber()
  home_cell_id: number;

  @IsOptional()
  @IsNumber()
  colony_id: number;

  @IsOptional()
  @IsArray()
  dependents: DependentCreationFromParentDto;

  @IsOptional()
  @IsArray()
  roles_and_responsibilities: ProfileRolesAndResponsibilitiesType;

  @IsOptional()
  @IsArray()
  service_team: ProfileServiceTeamsType;

  @IsOptional()
  @IsArray()
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
