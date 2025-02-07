import { IsString, IsInt, Min, Max, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// This file defines the data transfer object (DTO) for creating a superhero. 
// The decorators below will help validate the data.
export class CreateSuperheroDto {
  @ApiProperty({ example: 'Superman', 
    description: 'The name of the superhero', 
    type: 'string', 
    format: 'string' 
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ 
    example: 'Strength', 
    description: 'The main power of the superhero', 
    type: 'string', 
    format: 'string'  
  })
  @IsNotEmpty()
  @IsString()
  readonly power: string;

@ApiProperty({
  example: 7,
  description: 'The humility score of the superhero (between 1 and 10)',
  minimum: 1,
  maximum: 10,
  type: 'integer',
  format: 'int32'
})
@IsInt()
@Min(1)
@Max(10)
readonly humilityScore: number;
}