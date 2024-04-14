# Scenarios and Lexicons API
This API serves as a backend for managing scenarios and lexicons inside a project.

## Glossary
- Project: Any domain project, private or public, whose terms and jargon require good collective understanding.
- Lexicons: All the universe of information that belongs to a project.
- Symbol: Term or jargon within a project. It's a type of lexicon.
- Scenario: Specific description of a use case or an interaction between the system and its users. It's a type of lexicon.

## Base URL:
🚧 Not in production yet 🚧

## Documentation:
API documentation is available at /api/docs using Swagger UI

## How to Run
To run this Node.js TypeScript API locally, follow these steps:

### Prerequisites
Before you begin, ensure you have the following installed:

- Node.js (version >= 12)
- Yarn
- MySQL

### Setup Database
1. Ensure your MySQL server is running.
2. Create a database named scenarios_and_lexicons.

```sql
CREATE DATABASE scenarios_and_lexicons;
```

### Configure Environment Variables
1. Create a .env file in the root directory of the project.
2. Add the following environment variables:

```makefile
DB_TYPE=mysql
MYSQL_HOST=localhost
MYSQL_USER=<your_mysql_username>
MYSQL_PASSWORD=<your_mysql_password>
MYSQL_NAME=scenarios_and_lexicons
```

### Install Dependencies

```bash
cd scenarios-and-lexicons-api
yarn install
```

### Build
```bash
yarn build
```

### Run the Server

```bash
yarn start
```
The server will start running at http://localhost:3000.

## With Docker

### Prerequisites
Before you begin, ensure you have the following installed:

- Docker
- Docker Compose

### Configure Environment Variables
1. Create a .env file in the root directory of the project.
2. Add the following environment variables (the database host on docker is 'db'):

```makefile
DB_TYPE=mysql
MYSQL_HOST=db
MYSQL_USER=<your_mysql_username>
MYSQL_PASSWORD=<your_mysql_password>
MYSQL_NAME=scenarios_and_lexicons
```

### Build and Run with Docker Compose

```bash
cd scenarios-and-lexicons-api
docker-compose up --build
```

The server will start running at http://localhost:3000.

## Error Handling
All endpoints handle errors gracefully and return appropriate HTTP status codes along with error messages.

## Author
Created by [Daniel Vinícius](https://github.com/danvinicius) | <viniccius774@gmail.com>

## License
This project is licensed under the [MIT License](https://opensource.org/license/mit) - see the LICENSE file for details.
