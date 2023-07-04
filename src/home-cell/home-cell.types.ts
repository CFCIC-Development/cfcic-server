import { IsArray, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class HomeCellCreationObject {
  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}

export class HomeCellsCreationDto {
  @IsNotEmpty()
  @IsArray()
  cells: HomeCellCreationObject[];
}
