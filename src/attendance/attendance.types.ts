import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { DependentCreationFromParentObject } from '../dependent/dependent.types';
import { ApiProperty } from '@nestjs/swagger';

export class ExistingDependent {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  dependent_id: string;
}
export class AttendanceCreationDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty()
  event_id: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty()
  user_id: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  in_person: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  requires_feeding: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  requires_accomodation: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  requires_transport: boolean;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  services_required: number[];

  @IsOptional()
  @IsArray()
  @ApiProperty()
  dates_attending: Date[];

  @IsOptional()
  @IsArray()
  @ApiProperty()
  existing_dependents?: ExistingDependent[];

  @IsOptional()
  @IsArray()
  @ApiProperty()
  new_dependents?: DependentCreationFromParentObject[];
}

export class AttendanceUpdateServicesRequired {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  event_service_id: number;
}

export class AttendanceUpdateDto {
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  in_person: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  requires_feeding: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  requires_accomodation: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  requires_transport: boolean;
  @IsOptional()
  @IsArray()
  @ApiProperty()
  services_required?: number[];

  @IsOptional()
  @IsArray()
  @ApiProperty()
  dates_attending?: Date[];

  @IsOptional()
  @IsArray()
  @ApiProperty()
  new_dependents?: DependentCreationFromParentObject[];

  @IsOptional()
  @IsArray()
  @ApiProperty()
  add_existing_dependents?: ExistingDependent[];

  @IsOptional()
  @IsArray()
  @ApiProperty()
  remove_existing_dependents?: ExistingDependent[];
}

export class AttendanceUpdatingDto {
  // user_id?: string;
  @IsOptional()
  @IsArray()
  @ApiProperty()
  services_required?: Array<AttendanceUpdateServicesRequired> | object;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  dates_attending?: Date[];
}
