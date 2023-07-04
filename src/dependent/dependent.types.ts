import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  MinLength,
} from 'class-validator';

export class DependentCreationDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  last_name: string;

  @IsNotEmpty()
  @IsDateString()
  birthday: Date;

  @IsNotEmpty()
  @IsString()
  allergies: string;

  @IsNotEmpty()
  @Length(11, 13)
  emergency_contact: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  parent_profile_id: string;
}

export class DependentCreationFromParentObject {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  last_name: string;

  @IsNotEmpty()
  @IsDateString()
  birthday: Date;

  @IsNotEmpty()
  @IsString()
  allergies: string;

  @IsNotEmpty()
  @Length(11, 13)
  emergency_contact: string;
}

export type DependentCreationFromParentDto =
  DependentCreationFromParentObject[];
