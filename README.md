# Superhero API

The Superhero API is a simple NestJS application that allows you to manage superheroes. You can create superheroes, list them, and delete them. The API uses in-memory storage (an array) for simplicity.

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies by running:

   ```bash
   npm install
   ```

4. Start the application in development mode:

   ```bash
   npm run start:dev
   ```

5. The application will be available at [http://localhost:3000](http://localhost:3000).

## File Structure

```
superhero-api/
├── src/
│   ├── app.controller.ts       // Basic App controller
│   ├── app.controller.spec.ts  // Tests for App controller
│   ├── app.module.ts           // App root module
│   ├── app.service.ts          // Basic App service
│   ├── main.ts                 // Entry point of the application; sets up validation and Swagger
│   └── superheroes/            // Superheroes feature
│       ├── dto/
│       │   ├── create-superhero.dto.ts       // DTO to create a superhero with validation
│       │   ├── error-response.dto.ts           // DTOs for error responses for create and delete endpoints
│       │   └── superhero-response.dto.ts       // DTO for the superhero response (201)
│       ├── heroes.controller.ts  // Controller for superhero endpoints
│       ├── heroes.controller.spec.ts  // Unit tests for superhero controller
│       ├── heroes.module.ts      // Module for superheroes feature
│       ├── heroes.service.ts     // In-memory storage and business logic for superheroes
│       └── interfaces/
│           └── superhero.interface.ts  // Interface defining the Superhero object
├── test/
│   └── app.e2e-spec.ts         // End-to-end tests for the API
├── package.json                // Project metadata and scripts
├── tsconfig.json               // TypeScript configuration
├── tsconfig.build.json         // Build-related TypeScript configuration
├── nest-cli.json               // Nest CLI configuration
├── eslint.config.mjs           // ESLint configuration
├── .prettierrc                 // Prettier configuration
└── README.md                   // This file
```

## Endpoints

### GET /superheroes

- **Description:** Retrieves all superheroes stored in the system, sorted by 
humilityScore
in descending order.
- **Response (200):**
  - A JSON array of superhero objects.
  - Each superhero has:
    - id: Unique identifier.
    - name: The superhero's name.
    - power: The superhero's power.
    - humilityScore: A numeric score between 1 and 10.

### POST /superheroes

- **Description:** Creates a new superhero with the specified properties.
- **Request Body:**  
  The request body must be a JSON object following the structure defined in the CreateSuperheroDto, for example:
  ```json
  {
    "name": "Superman",
    "power": "Flying",
    "humilityScore": 10
  }
  ```
- **Validation:**
  - `name` and `power`must be non-empty strings.
  - `humilityScore` must be an integer between 1 and 10.
- **Response (201):**
  - The newly created superhero object following the 
SuperheroResponseDto
structure.
- **Response (400):**
  - A structured error response if the input validation fails.

### DELETE /superheroes

- **Description:** Deletes a superhero by its unique ID provided as a query parameter.
- **Query Parameter:**
  - id: The ID of the superhero to delete. This parameter is required.
- **Response (200):**
  - A confirmation message stating that the superhero has been successfully deleted.
- **Response (500):**
  - A structured error response if the id is not provided or if something goes wrong.

## Swagger Documentation

Once the application is running, you can access the Swagger UI at [http://localhost:3000/docs](http://localhost:3000/docs). Swagger provides a detailed description of each endpoint, the expected request parameters, and response models.

## Running Tests

Unit tests are written using Jest. To run the tests, execute:

```bash
npm run test
```


## Summary

The Superhero API is a straightforward demonstration of using NestJS to build RESTful endpoints with proper validation and Swagger documentation. The project is structured to separate concerns, making it easier to manage and scale.