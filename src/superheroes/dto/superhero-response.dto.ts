import { ApiProperty } from '@nestjs/swagger';

export class SuperheroResponseDto {
  @ApiProperty({ example: 1, description: 'Unique identifier of the superhero' })
  id: number;

  @ApiProperty({ example: 'Superman', description: 'The name of the superhero' })
  name: string;

  @ApiProperty({ example: 'Flying', description: 'The unique power of the superhero' })
  power: string;

  @ApiProperty({ example: 10, description: 'The humility score of the superhero' })
  humilityScore: number;
}