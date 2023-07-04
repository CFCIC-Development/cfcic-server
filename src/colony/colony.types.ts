import { IsNotEmpty, IsString } from 'class-validator';

export class ColonyCreationObject {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class ColonyCreationDto {
  names: ColonyCreationObject[];
}
