import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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

export class AuthResponseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3OTMwNWQ1NS1iMDZhLTQ2MjItYTY3Zi03OTAwMDM4N2Q2NzgiLCJlbWFpbCI6ImxleEBsZXguY29tIiwiaWF0IjoxNjkwNzY1MTg1LCJleHAiOjE2OTA3NzA1ODV9.lw49KeuBiHSqI17mbRBW4E_Nn-TxAMmZTzjmJR4U5S8',
  })
  access_token: string;
}
