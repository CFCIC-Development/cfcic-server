import { IsArray, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ServiceTeamCreationObject {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}

export class ServiceTeamsCreationDto {
  @IsNotEmpty()
  @IsArray()
  teams: ServiceTeamCreationObject[];
}
