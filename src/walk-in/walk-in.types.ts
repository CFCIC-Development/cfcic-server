import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export interface CreateWalkInDto {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  is_church_member: boolean;
  how_heard_about_program: string;
  is_partner: boolean;
  event_id: string;
}

export class CreateWalkInFormDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  last_name: string;

  @IsNotEmpty()
  @IsString()
  @Length(11, 13)
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  is_church_member: boolean;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  how_heard_about_program: string;

  @IsNotEmpty()
  @IsBoolean()
  is_partner: boolean;
}
