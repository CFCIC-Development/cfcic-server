import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EventCreationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Sample Event' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'An awesome event' })
  tagline: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'https://example.com/banner.jpg' })
  banner_image: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2023-08-15T10:00:00Z' })
  start_date: Date;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2023-08-17T18:00:00Z' })
  end_date: Date;
}

export class EventUpdateDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Sample Event' })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'An awesome event' })
  tagline?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'https://example.com/banner.jpg' })
  banner_image?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2023-08-17T18:00:00Z' })
  start_date?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2023-08-17T18:00:00Z' })
  end_date?: Date;
}

export class EventResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  tagline: string;

  @ApiProperty()
  banner_image: string;

  @ApiProperty()
  start_date: string;

  @ApiProperty()
  end_date: string;
}

export interface EventUpdateAfterImgUploadDto {
  name?: string;
  tagline?: string;
  banner_image?: string;
  start_date?: Date;
  end_date?: Date;
}
