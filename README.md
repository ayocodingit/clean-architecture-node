# Boilerplate Clean Architecture for Node.js

![Node.js Logo](https://nodejs.org/static/images/logo.svg)

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/ayocodingit/boilerplate-clean-architecture)
[![Maintainability](https://api.codeclimate.com/v1/badges/12c10806992f9baa009f/maintainability)](https://codeclimate.com/github/ayocodingit/boilerplate-clean-architecture/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/12c10806992f9baa009f/test_coverage)](https://codeclimate.com/github/ayocodingit/boilerplate-clean-architecture/test_coverage)

## 📖 Introduction

This boilerplate is a robust and scalable foundation for building Node.js applications using **Clean Architecture** principles. It is designed to help developers create maintainable, testable, and loosely coupled systems.

By separating concerns into distinct layers (Entities, Use Cases, Interface Adapters, Frameworks), this boilerplate ensures that your business logic remains independent of frameworks, databases, and external agencies.

## 🚀 Why use this boilerplate?

- **Separation of Concerns**: Business rules are isolated from implementation details.
- **Testability**: The architecture makes it easy to test business logic without UI, database, or web server.
- **Scalability**: Easy to add new features and maintain existing ones as the project grows.
- **Type Safety**: Built with **TypeScript** for better developer experience and code reliability.
- **Database Agnostic**: While it comes with **Sequelize**, the repository pattern allows you to switch databases with minimal impact on business logic.
- **Ready-to-use Features**: Includes Docker support, linting, migration tools, and more.

## ✨ Features

- **Clean Architecture Layers**:
  - **Entities**: Enterprise business rules.
  - **Use Cases**: Application business rules.
  - **Interface Adapters**: Controllers, Gateways, Presenters.
  - **Frameworks & Drivers**: Web Framework (Express), Database (Sequelize), etc.
- **Tech Stack**:
  - **Runtime**: Node.js v20+
  - **Language**: TypeScript
  - **Framework**: Express.js
  - **ORM**: Sequelize (SQL)
  - **Containerization**: Docker
  - **Testing**: Jest
  - **Logging**: Winston
  - **Validation**: Joi / Class Validator (via config schema)
  - **Linting & Formatting**: Eslint & Prettier

## 📂 Folder Structure

The project structure is organized to reflect the Clean Architecture layers:

```text
src/
├── config/             # Environment variables and configuration
├── cron/               # Cron jobs
├── database/           # Database migrations and seeds
├── external/           # External API integrations
├── helpers/            # Utility functions
├── modules/            # Business logic (The Core)
│   └── [module_name]/
│       ├── entity/     # Domain entities/interfaces
│       ├── repository/ # Data access interfaces
│       └── usecase/    # Application business rules
├── pkg/                # Shared packages/libraries
├── transport/          # Entry points (HTTP, gRPC, etc.)
│   └── http/
│       ├── middleware/ # Express middlewares
│       └── [module]/   # HTTP Handlers/Controllers
├── main.ts             # Application entry point
└── migrater.ts         # Migration runner
```

## 🛠️ Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (optional, for containerized run)

### Steps

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/ayocodingit/clean-architecture-node.git
    cd clean-architecture-node
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Configuration:**

    Copy the example environment file and update it with your credentials.

    ```bash
    cp .env.example .env
    ```

4.  **Database Setup:**

    Ensure your database is running (update `.env` with DB credentials). Then run migrations:

    ```bash
    npm run migrate
    ```

    (Optional) Seed the database:

    ```bash
    npm run seed:run --name=your-seed-filename
    ```

## 🏃 Usage

### Development Mode

Runs the application with hot-reloading.

```bash
npm run dev
```

### Production Build

Builds the TypeScript code to JavaScript.

```bash
npm run build
```

Start the built application:

```bash
npm start
```

### Docker

Build and run the application using Docker.

```bash
# Build image
docker -f docker/Dockerfile build -t my-app .

# Run container
docker run -p 3000:3000 -d my-app
```

## 🧪 Testing

Run unit and integration tests.

```bash
npm test
```

## 📝 Tutorial: Creating a New Module

Here is a quick guide on how to add a new feature (e.g., `Post`) following the architecture.

1.  **Define the Entity**:
    Create `src/modules/post/entity/interface.ts` to define the data structure.

2.  **Create the Repository Interface**:
    Create `src/modules/post/repository/repository.ts` to define how data is accessed (methods like `findById`, `save`).

3.  **Implement the Use Case**:
    Create `src/modules/post/usecase/usecase.ts`. This class should implement the business logic and use the repository interface.

4.  **Implement the Repository**:
    Create `src/modules/post/repository/mysql/repository.ts` (or other DB) to implement the repository interface using Sequelize.

5.  **Create the HTTP Handler**:
    Create `src/transport/http/post/handler.ts` to handle HTTP requests, validate input, and call the Use Case.

6.  **Register Routes**:
    Add the new routes in the main HTTP router (e.g., `src/transport/http/http.ts`).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
