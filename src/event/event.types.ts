import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class EventCreationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  tagline: string;

  @IsOptional()
  banner_image: Express.Multer.File;

  @IsNotEmpty()
  @IsDateString()
  start_date: Date;

  @IsNotEmpty()
  @IsDateString()
  end_date: Date;
}

export class EventUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  tagline?: string;

  @IsOptional()
  banner_image?: Express.Multer.File;

  @IsOptional()
  @IsDateString()
  start_date?: Date;

  @IsOptional()
  @IsDateString()
  end_date?: Date;
}

export interface EventUpdateAfterImgUploadDto {
  name?: string;
  tagline?: string;
  banner_image?: string;
  start_date?: Date;
  end_date?: Date;
}
