import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ChurchCenterCreationObject {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class ChurchCenterCreationDto {
  @IsNotEmpty()
  @IsArray()
  names: ChurchCenterCreationObject[];
}
