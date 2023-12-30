# Boilerplate Clean Architecture for Node.js

![Node.js Logo](https://nodejs.org/static/images/logo.svg)

This boilerplate provides a solid foundation for Node.js applications using Clean Architecture principles. It incorporates a tech stack including Mongoose, Sequelize, TypeScript, Docker, and the default HTTP framework Express.

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

## Configuration

### Mongoose (MongoDB)

- Configure MongoDB connection in `src/config/mongoose.ts`.

### Sequelize (SQL)

- Configure SQL database connection in `src/config/sequelize.ts`.

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
docker build -t your-image-name .
```

Run Docker container:

```bash
docker run -p 3000:3000 -d your-image-name
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## Package.json Scripts

- `start:dev`: Start the development server using nodemon.
- `build`: Clean the build directory and run TypeScript compiler.
- `start`: Start the application from the build directory.
- `lint`: Check code style using Prettier.
- `lint:fix`: Fix code style issues using Prettier.
- `cron:run`: Run cron jobs specified by name.
- `seed:run`: Run database seeds specified by name.
- `migration:generate`: Generate a Sequelize migration with a specified name.
- `migrate:up`: Run Sequelize migrations to update the database.
- `migrate:down`: Rollback Sequelize migrations.
- `migrate:up:local`: Build and run migrations in local development.
- `migrate:down:local`: Build and rollback migrations in local development.
- `test`: Run tests using Jest.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support or issues, please open an [issue](https://github.com/ayocodingit/boilerplate-clean-architecture/issues).

Feel free to customize this README to suit your project's specifics. Adjust the Clean Architecture layers and principles as needed for your application.