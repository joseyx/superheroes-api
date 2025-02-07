import { Injectable } from '@nestjs/common';
import { Superhero } from './interfaces/superhero.interface';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

@Injectable()
export class SuperheroesService {
  // In-memory array to store superheroes
  private superheroes: Superhero[] = [];
  private idCounter = 1; // To assign unique IDs to each superhero

  // Get all superheroes order by humillityScore in descending order
  findAll(): Superhero[] {
    return this.superheroes.sort((a, b) => b.humillityScore - a.humillityScore);
  }

  // Create and store a new superhero
  create(createSuperheroDto: CreateSuperheroDto): Superhero {
    const superhero: Superhero = {
      id: this.idCounter++,
      ...createSuperheroDto,
    };

    this.superheroes.push(superhero);
    return superhero;
  }

  // Delete a superhero by ID
  delete(id: number): void {
    const index = this.superheroes.findIndex((superhero) => superhero.id === id);
    if (index === -1) {
      throw new Error('Superhero not found');
    }
    this.superheroes.splice(index, 1);
  }
}
