import { IsArray, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RoleCreationObject {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}

export class RolesCreationDto {
  @IsNotEmpty()
  @IsArray()
  roles: RoleCreationObject[];
}
