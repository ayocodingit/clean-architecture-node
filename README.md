# Boilerplate Clean Architecture for Node.js

![Node.js Logo](https://nodejs.org/static/images/logo.svg)

This boilerplate provides a foundation for Node.js applications using Clean Architecture principles. It utilizes a tech stack including Mongoose, Sequelize, TypeScript, and Docker. The default HTTP framework is Express.

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/ayocodingit/boilerplate-clean-architecture)

## Tech Stack

- Node.js v14
- Mongoose (MongoDB ODM)
- Sequelize (SQL ORM)
- TypeScript
- Docker
- Express (HTTP framework)

## Design Pattern: Clean Architecture

The project follows the principles of Clean Architecture, emphasizing separation of concerns into distinct layers:

- **Entities**: Representing the core business entities.
- **Use Cases**: Defining application-specific business rules.
- **Interface Adapters**: Implementing details for external frameworks and tools.
- **Frameworks & Drivers**: Implementing details for external frameworks and tools (Express, databases, etc.).

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ayocodingit/boilerplate-clean-architecture.git
   ```

2. Navigate to the project directory:

   ```bash
   cd boilerplate-clean-architecture
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Copy the appropriate environment file:

   - For MongoDB, use `.env.example.mongo`:

     ```bash
     cp .env.example.mongo .env
     ```

   - For SQL (choose MySQL, PostgreSQL, or SQLite), use `.env.example.sql`:

     ```bash
     cp .env.example.sql .env
     ```

   Customize the `.env` file according to your configuration.

## Usage

### Development

```bash
npm run start:dev
```

### Build

```bash
npm run build
```

### Start

```bash
npm start
```

### Docker

Build Docker image:

```bash
docker -f docker/Dockerfile build -t your-image-name .
```

Run Docker container:

```bash
docker run -p 3000:3000 -d your-image-name
```

## Additional Scripts

- **Linting:**
  - Check code formatting:
    ```bash
    npm run lint
    ```
  - Fix code formatting:
    ```bash
    npm run lint:fix
    ```

- **Database Migration:**
  - Run migrations:
    ```bash
    npm run migrate:up
    ```
  - Rollback migrations:
    ```bash
    npm run migrate:down
    ```

- **Local Database Migration (development):**
  - Generate migration file:
    ```bash
    npm run migration:generate --name your-migration-name
    ```
  - Run migrations:
    ```bash
    npm run migrate:up:local
    ```
  - Rollback migrations:
    ```bash
    npm run migrate:down:local
    ```

- **Seed:**
  - Run Seed:
    ```bash
    npm run seed:run --name your-seed-filename
    ```


- **Cron:**
  - Run Cron:
    ```bash
    npm run seed:run --name your-cron-filename
    ```

- **Testing:**
  - Run tests:
    ```bash
    npm test
    ```

## Folder Structure Modules

```bash
modules/
└── name module/
    ├── delivery/
    │   ├── http/
    │   │   └── handler.ts
    │   ├── grpc/
    │   │   └── handler.ts
    │   └── graphQL/
    │       └── handler.ts
    ├── entity/
    │   ├── interface.ts // for the core business entities
    │   └── schema.ts // for the schema validation
    ├── repository/
    │   ├── mongo/
    │   │   └── repository.ts
    │   ├── mySQL/
    │   │   └── repository.ts
    │   └── postgreSQL/
    │       └── repository.ts
    ├── usecase/
    │   └── usecase.ts
    └── name module.ts // for init the module to load in the main
```
