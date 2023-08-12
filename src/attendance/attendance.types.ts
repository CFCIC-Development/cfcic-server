import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
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
  @IsObject()
  @ApiProperty()
  user: Record<string, never>;

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

class DependentDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  birthday: Date;

  @ApiProperty()
  allergies: string;

  @ApiProperty()
  emergency_contact: string;

  @ApiProperty()
  parent_profile_id: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

class EventServiceDto {
  @ApiProperty()
  name: string;
}

class ServiceRequiredDto {
  @ApiProperty()
  event_service: EventServiceDto;
}

export class RegistrationDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  event_id: string;

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  in_person: boolean;

  @ApiProperty()
  requires_feeding: boolean;

  @ApiProperty()
  requires_accomodation: boolean;

  @ApiProperty()
  requires_transport: boolean;

  @ApiProperty({ type: [Date] })
  dates_attending: Date[];

  @ApiProperty()
  checked_in: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: [ServiceRequiredDto] })
  services_required: ServiceRequiredDto[];

  @ApiProperty({ type: [DependentDto] })
  children: DependentDto[];
}

export class ListRegistrationDto extends Array<RegistrationDto> {}
