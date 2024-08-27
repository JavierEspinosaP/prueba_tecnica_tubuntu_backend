# Prueba técnica Tubuntu Backend

## Description

This project is a backend service designed to interact with the [PokéAPI](https://pokeapi.co/api/v2/), providing endpoints to retrieve and process Pokémon data. The service is built using Node.js with Express and TypeScript. Additionally, the project is containerized using Docker, enabling it to run efficiently in a clustered environment.

## Deployment

- **URL:** [https://prueba-tecnica-ubuntu-backend.onrender.com](https://prueba-tecnica-ubuntu-backend.onrender.com)

## Project Structure

The project is organized into the following main directories and files:

- **src/**
  - **controllers/**
    - pokemon.controller.ts: Handles the request and response logic for the Pokémon-related endpoints.
  - **routes/**
    - pokemon.routes.ts: Defines the routes/endpoints and links them with the appropriate controllers.
  - **services/**
    - pokemon.services.ts: Contains the business logic and the functions to call external APIs like the PokéAPI.
  - **types/**
    - pokemon.types.ts: Defines TypeScript types used throughout the project.
  - **utils/**
    - csv.util.ts: Utility functions for handling CSV file generation.
  - server.ts: Entry point of the application, sets up the server and applies middleware.

- Dockerfile: Configuration for containerizing the application.
- .env: Environment variables configuration file (not included in the repository for security reasons).
- package.json: Defines dependencies, scripts, and project metadata.
- tsconfig.json: TypeScript configuration file.

## Installation

To set up the project, follow these steps:

1. **Clone the repository:**

   ``` 
   git clone https://github.com/JavierEspinosaP/prueba_tecnica_tubuntu_backend.git 
   ```

   ```
   cd prueba_tecnica_tubuntu_backend
   ```

2. **Install dependencies:**

   ``` 
   pnpm install
   ```

3. **Set up environment variables:**
   - Create a .env file in the root directory and configure the required environment variables:

   ```
     PORT=3000
     POKEAPI_BASE_URL=https://pokeapi.co/api/v2/
     ```

4. **Build the project:**
   ```
    pnpm build
    ```

5. **Run the project:**
    ```
    pnpm dev
   ```

## Endpoints

### 1. Find a Pokémon by Name

- **URL:** POST /pokemon/findByName
- **Request Body:**
  - name: PIKa chu
- **Response:**

```
{
    count: 1
    results: [
    {
        base_experience: 112
        name: pikachu
        height: 4
        weight: 60
    }

]
}
```

### 2. Get a CSV of Pokémon by Color

- **URL:** GET /pokemon/csv/:color
- **Description:** Returns a CSV file containing a list of all Pokémon of the specified color, ordered by their base experience.
- **Sample Response:**
```
  name;base_experience;height;weight
  pikachu;112;4;60
  ```

## API Calls Management

The application uses the axios library to make calls to the external PokéAPI. These calls are managed within the pokemon.services.ts file, which contains functions to fetch Pokémon data based on different criteria like name and color. The responses are then processed and sent back to the client in the required format (JSON or CSV).

## Dockerization

The project is Dockerized using a Dockerfile, which allows the application to be built into a Docker image and run inside a container. This setup is beneficial for deploying the application in a clustered environment, ensuring consistency across different environments.

To build and run the Docker container:

1. **Build the Docker image:**
   - docker build -t prueba_tecnica_tubuntu_backend .

2. **Run the Docker container:**
   - docker run -d -p 3000:3000 prueba_tecnica_tubuntu_backend

