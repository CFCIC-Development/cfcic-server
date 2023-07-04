import { IsNotEmpty, IsString } from 'class-validator';

export class ChurchArmCreationObject {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export type ChurchArmsCreationDto = ChurchArmCreationObject[];
