
# Superhero API

The Superhero API is a simple NestJS application that allows you to manage superheroes. You can create superheroes, list them, and delete them. The API uses in-memory storage (an array) for simplicity.

This repository also includes a React client (built with Vite) that demonstrates how to interact with the API.

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies by running:

   ```bash
   npm install
   ```

4. Navigate to the client folder and install React dependencies:

   ```bash
   cd client
   npm install
   cd ..
   ```

## Running the Application

### Start the API and Client concurrently

The repository includes both the NestJS API and the React client. You can run them concurrently using the following command from the repository root:

```bash
npm run dev
```

This command uses the [concurrently](https://www.npmjs.com/package/concurrently) package and is configured in package.json as follows:

```json
"scripts": {
  "start:api": "nest start --watch",
  "start:client": "npm run dev --prefix client",
  "dev": "concurrently \"npm run start:api\" \"npm run start:client\""
}
```

- The NestJS API will run on [http://localhost:3000](http://localhost:3000).
- The React client (Vite) will likely run on [http://localhost:5173](http://localhost:5173), with API calls proxied to the API server.

## File Structure

```
superhero-api/
├── src/                          // NestJS API source code
│   ├── app.controller.ts         // Basic App controller
│   ├── app.controller.spec.ts    // Tests for App controller
│   ├── app.module.ts             // App root module
│   ├── app.service.ts            // Basic App service
│   ├── main.ts                  // Entry point of the application; sets up validation and Swagger
│   └── superheroes/              // Superheroes feature
│       ├── dto/
│       │   ├── create-superhero.dto.ts    // DTO for creating a superhero with validation
│       │   ├── error-response.dto.ts        // DTOs for error responses (create and delete endpoints)
│       │   └── superhero-response.dto.ts    // DTO for successful superhero response (201)
│       ├── heroes.controller.ts   // Controller for superhero endpoints
│       ├── heroes.controller.spec.ts   // Unit tests for superhero controller
│       ├── heroes.module.ts       // Module for superheroes feature
│       ├── heroes.service.ts      // In-memory storage and business logic for superheroes
│       └── interfaces/
│           └── superhero.interface.ts       // Interface defining the Superhero object
├── client/                       // React client built with Vite
│   ├── src/
│   │   ├── App.tsx               // Main React component
│   │   ├── api/                  // API service to interact with the NestJS backend
│   │   │   └── superheroApi.ts   // Axios API calls (GET, POST, DELETE)
│   │   └── ...                   // Other React components and assets
│   ├── public/                   // Static assets
│   ├── index.html                // HTML template
│   ├── package.json              // Client-specific dependencies and scripts
│   ├── tsconfig.json             // TypeScript configuration for the React client
│   └── vite.config.ts            // Vite configuration with proxy settings
├── test/                         // End-to-end tests for the API
│   └── app.e2e-spec.ts
├── package.json                  // Root package metadata, dependencies, and scripts
├── tsconfig.json                 // TypeScript configuration for the NestJS API
├── tsconfig.build.json           // Build-related TypeScript configuration
├── nest-cli.json                 // Nest CLI configuration
├── eslint.config.mjs             // ESLint configuration
├── .prettierrc                   // Prettier configuration
└── README.md                     // This file
```

## Endpoints

### GET /superheroes

- **Description:** Retrieves all superheroes stored in the system, sorted by `humilityScore` in descending order.
- **Response (200):**
  - A JSON array of superhero objects.
  - Each superhero has:
    - `id`: Unique identifier.
    - `name`: The superhero's name.
    - `power`: The superhero's power.
    - `humilityScore`: A numeric score between 1 and 10.

### POST /superheroes

- **Description:** Creates a new superhero with the specified properties.
- **Request Body:**  
  The request body must be a JSON object following the structure defined in `CreateSuperheroDto`. For example:
  ```json
  {
    "name": "Superman",
    "power": "Flying",
    "humilityScore": 10
  }
  ```
- **Validation:**
  - `name` and `power` must be non-empty strings.
  - `humilityScore` must be an integer between 1 and 10.
- **Response (201):**
  - The newly created superhero object following the `SuperheroResponseDto` structure.
- **Response (400):**
  - A structured error response if the input validation fails. For example:
    ```json
    {
        "message": [
            "humilityScore must not be greater than 10"
        ],
        "error": "Bad Request",
        "statusCode": 400
    }
    ```

### DELETE /superheroes

- **Description:** Deletes a superhero by its unique ID provided as a query parameter.
- **Query Parameter:**
  - `id`: The ID of the superhero to delete (required).
- **Response (200):**
  - A confirmation message stating that the superhero has been successfully deleted.
- **Response (500):**
  - A structured error response if the `id` is not provided or if something goes wrong.

## Swagger Documentation

After starting the API, you can access the Swagger UI at [http://localhost:3000/docs](http://localhost:3000/docs). Swagger provides a detailed description of each endpoint, the expected request parameters, and response models.

## Running Tests

Unit tests are written using Jest. To run the tests, execute:

```bash
npm run test
```

## Summary

The Superhero API demonstrates the use of NestJS for building RESTful endpoints with validation and Swagger documentation. The included React client (built with Vite) shows how to interact with these endpoints to manage superhero data. This project is structured to separate concerns, making it easier to manage and scale.
