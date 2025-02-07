import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesController } from './superheroes.controller';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { SuperheroesService } from './superheroes.service';

describe('SuperheroesController', () => {
  let controller: SuperheroesController;
  let service: SuperheroesService;

  // Mock the SuperheroesService
  const mockSuperheroesService = {
    findAll: jest.fn().mockReturnValue([
      { id: 1, name: 'Superman', power: 'Flying', humilityScore: 10 },
      { id: 2, name: 'Batman', power: 'Richness', humilityScore: 5 },
    ]),
    create: jest.fn().mockImplementation((dto: CreateSuperheroDto) => {
      return {
        id: 1,
        ...dto,
      };
    }),
    delete: jest.fn().mockReturnValue({ message: 'Deleted successfully' }),
  }; 

  // Create a new instance of the controller before each test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroesController],
      providers: [SuperheroesService],
    })
      .overrideProvider(SuperheroesService)
      .useValue(mockSuperheroesService)
      .compile();

    controller = module.get<SuperheroesController>(SuperheroesController);
    service = module.get<SuperheroesService>(SuperheroesService);
  });

  // Test the controller
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Test the findAll method
  describe('findAll', () => {
    it('should return an array of superheroes', () => {
      const result = controller.findAll();
      expect(result).toEqual([
        { id: 1, name: 'Superman', power: 'Flying', humilityScore: 10 },
        { id: 2, name: 'Batman', power: 'Richness', humilityScore: 5 },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  // Test the create method
  describe('create', () => {
    it('should create and return a new superhero', () => {
      const dto: CreateSuperheroDto = { name: 'Batman', power: 'Richness', humilityScore: 5 };
      const result = controller.create(dto);
      expect(result).toEqual({ id: 1, ...dto });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  // Test the delete method
  describe('delete', () => {
    it('should delete a superhero when a valid id is provided', () => {
      const result = controller.delete('1');
      expect(service.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ message: 'Deleted successfully' });
    });

    it('should throw an error if no id is provided', () => {
      expect(() => controller.delete('')).toThrow('Please provide an ID');
    });
  });
});
