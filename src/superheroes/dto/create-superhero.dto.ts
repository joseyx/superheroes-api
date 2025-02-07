// This file is used to define the data transfer object (DTO) for creating a superhero. 
// This DTO will be used to validate the data used to create a superhero.
export class CreateSuperheroDto {
  readonly name: string;
  readonly power: string;
  readonly humillityScore: number;
}