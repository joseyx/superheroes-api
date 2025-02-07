import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

@Controller('superheroes')
export class SuperheroesController {

  // Inject the SuperheroesService into the controller
  constructor(private readonly superheroesService: SuperheroesService) {}

  // endpoint to get all superheroes
  @Get()
  findAll() {
    return this.superheroesService.findAll();
  }

  // endpoint to create a new superhero
  @Post()
  create(@Body() createSuperheroDto: CreateSuperheroDto) {
    return this.superheroesService.create(createSuperheroDto);
  }

  // endpoint to delete a superhero by ID as a query parameter
  @Delete()
  delete(@Query('id') id?: string) {
    if (!id) {
      throw new Error('Please provide an ID');
    }
    const intId = parseInt(id, 10);
    return this.superheroesService.delete(intId);
  }
}
