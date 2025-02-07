import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SuperheroResponseDto } from './dto/superhero-response.dto';
import { ErrorCreateSupeResponseDto, ErrorDeleteSupeResponseDto } from './dto/error-response.dto';

@Controller('superheroes')
export class SuperheroesController {

  // Inject the SuperheroesService into the controller
  constructor(private readonly superheroesService: SuperheroesService) {}

  // endpoint to get all superheroes
  @Get()
  @ApiOperation({ 
    summary: 'Get all superheroes', 
    description: 'Returns all superheroes ordered by humilityScore in descending order.' 
  })
  @ApiResponse({ status: 200, description: 'The superheroes have been successfully retrieved.', type: SuperheroResponseDto, isArray: true })
  findAll() {
    return this.superheroesService.findAll();
  }

  // endpoint to create a new superhero
  @Post()
  @ApiOperation({ 
    summary: 'Create a new superhero', 
    description: 'Creates a superhero with specified properties such as name, power, and humilityScore.' 
  })
  @ApiResponse({ status: 201, description: 'The superhero has been successfully created.', type: ErrorCreateSupeResponseDto})
  @ApiResponse({ status: 400, description: 'Bad Request.', type: ErrorCreateSupeResponseDto })
  create(@Body() createSuperheroDto: CreateSuperheroDto) {
    return this.superheroesService.create(createSuperheroDto);
  }

  // endpoint to delete a superhero by ID as a query parameter
  @Delete()
  @ApiOperation({ 
    summary: 'Delete a superhero', 
    description: 'Deletes a superhero by ID.' 
  })
  @ApiResponse({ status: 200, description: 'The superhero has been successfully deleted.'})
  @ApiResponse({ status: 500, description: 'Internal server error.', type: ErrorDeleteSupeResponseDto })
  delete(@Query('id') id?: string) {
    if (!id) {
      throw new Error('Please provide an ID');
    }
    const intId = parseInt(id, 10);
    return this.superheroesService.delete(intId);
  }
}
