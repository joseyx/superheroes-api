import { IsString, IsInt, Min, Max } from 'class-validator';

// This file defines the data transfer object (DTO) for creating a superhero. 
// The decorators below will help validate the data.
export class CreateSuperheroDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly power: string;

  @IsInt()
  @Min(1)
  @Max(10)
  readonly humilityScore: number;
}