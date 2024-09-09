# Scenarios and Lexicons API
This API serves as a backend for managing scenarios and lexicons inside a project.

## Glossary
- Project: Any domain project, private or public, whose terms and jargon require good collective understanding.
- Lexicon: All the universe of information that belongs to a project.
- Symbol: Term or jargon within a project.
- Scenario: A type of use case or an interaction between the system and its users.
- User: The user of the system. It can be the owner of a project, an admin, an collaborator or an observer.

## Base URL:
🚧 Not in production yet 🚧

## To do

- [ ] Adicionar cenários
- [ ] Editar símbolos
- [ ] Editar nome/descrição do projeto
- [ ] Remover cenários
- [ ] Remover símbolos
- [ ] Ordenar episódios
- [ ] Ver impactos existentes ao adicionar novo impacto
- [ ] Ver sinônimos existentes ao adicionar novo sinônimo
- [ ] Adicionar usuários ao projeto
- [ ] Checar responsividade
- [ ] Chegar reaproveitamento de classes, componentes e hooks
- [ ] Checar viabilidade PG -> MongoDB
- [ ] Visualizar e rastrear alterações (responsável, data/hora, conteúdo, motivo)
- [ ] Importar arquivo próprio para criar projetos, cenários e símbolos
- [ ] Exportar arquivos para BDD e TDD
- [ ] Autenticação com Google / Facebook
- [ ] Checar SEO e performance


## Resources documentation:
Resources documentation is available at /api/docs using Swagger UI

## How to Run
To run this API locally, follow these steps:

### Prerequisites
Before you begin, ensure you have the following installed:

- Node.js (version >= 12)
- Yarn
- Postgres

OR

[Run with Docker](#with-docker)

### Setup Database
1. Ensure your Postgres server is running.
2. Create a database named scenarios_and_lexicons.

```sql
CREATE DATABASE scenarios_and_lexicons;
```

### Configure Environment Variables
1. Create a .env file in the root directory of the project.
2. Add the following environment variables:

```makefile
DB_USER=<your_postgres_username>
DB_HOST=localhost
DB_NAME=scenarios_and_lexicons
DB_PASSWORD=<your_postgres_password>
DB_PORT=5432
PORT=3000
DB_TYPE=postgres
AUTH_SECRET=<your_auth_secret_string>
```

### Install Dependencies

```bash
cd scenarios-and-lexicons
yarn install
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
DB_USER=postgres
DB_HOST=db
DB_NAME=scenarios_and_lexicons
DB_PASSWORD=password
DB_PORT=5432
PORT=3000
DB_TYPE=postgres
AUTH_SECRET=<your_auth_secret_string>

```

### Build and Run with Docker Compose

```bash
cd scenarios-and-lexicons
docker-compose up --build
```

The server will start running at http://localhost:3000.

## Create Postgres database into Docker environment

1. In another tab, run:
```bash
sudo docker exec -it postgres psql -U postgres
```

2. Create database:
```sql
CREATE DATABASE scenarios_and_lexicons;
```

## Error Handling
All endpoints handle errors gracefully and return appropriate HTTP status codes along with error messages.

## Author
Created by [Daniel Vinícius](https://github.com/danvinicius) | <viniccius774@gmail.com>

## License
This project is licensed under the [MIT License](https://opensource.org/license/mit) - see the LICENSE file for details.
