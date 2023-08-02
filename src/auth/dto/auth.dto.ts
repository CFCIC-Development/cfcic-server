import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'blessed@cfcic.org' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'pa$$w0r4' })
  password: string;
}
export class UserDto {
  @IsString()
  id: string;

  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  display_picture: string;

  @IsString()
  provider: string;

  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;

  @IsNotEmpty()
  @IsDateString()
  updatedAt: Date;
}

export class AuthResponseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3OTMwNWQ1NS1iMDZhLTQ2MjItYTY3Zi03OTAwMDM4N2Q2NzgiLCJlbWFpbCI6ImxleEBsZXguY29tIiwiaWF0IjoxNjkwNzY1MTg1LCJleHAiOjE2OTA3NzA1ODV9.lw49KeuBiHSqI17mbRBW4E_Nn-TxAMmZTzjmJR4U5S8',
  })
  access_token: string;

  @IsNotEmpty()
  @IsObject()
  @ApiProperty({
    example: {
      id: '79305d55-b06a-4622-a67f-79000387d678',
      email: 'lex@lex.com',
      name: 'lex',
      display_picture: 'www.pics.jpg',
      provider: null,
      createdAt: '2023-07-31T00:53:18.704Z',
      updatedAt: '2023-07-31T00:53:18.704Z',
    },
  })
  user: UserDto;
}
