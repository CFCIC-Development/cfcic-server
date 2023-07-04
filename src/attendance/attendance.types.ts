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
  event_id: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @IsBoolean()
  in_person: boolean;

  @IsOptional()
  @IsArray()
  services_required: number[];

  @IsOptional()
  @IsArray()
  dates_attending: Date[];

  @IsOptional()
  @IsArray()
  existing_dependents?: ExistingDependent[];

  @IsOptional()
  @IsArray()
  new_dependents?: DependentCreationFromParentObject[];
}

export class AttendanceUpdateServicesRequired {
  @IsNotEmpty()
  @IsNumber()
  event_service_id: number;
}

export class AttendanceUpdateDto {
  @IsOptional()
  @IsArray()
  services_required?: number[];

  @IsOptional()
  @IsArray()
  dates_attending?: Date[];

  @IsOptional()
  @IsArray()
  new_dependents?: DependentCreationFromParentObject[];

  @IsOptional()
  @IsArray()
  add_existing_dependents?: ExistingDependent[];

  @IsOptional()
  @IsArray()
  remove_existing_dependents?: ExistingDependent[];
}

export class AttendanceUpdatingDto {
  // user_id?: string;
  @IsOptional()
  @IsArray()
  services_required?: Array<AttendanceUpdateServicesRequired> | object;

  @IsOptional()
  @IsArray()
  dates_attending?: Date[];
}
