# Lexhub
This platform helps software engineers and requirements engineers managing scenarios and lexicons inside a project.

## Glossary
- Project: Any domain project, private or public, whose terms and jargon require good collective understanding.
- Lexicon: All the universe of information that belongs to a project.
- Symbol: Term or jargon within a project.
- Scenario: A type of use case or an interaction between the system and its users.
- User: The user of the system. It can be the owner of a project, an admin, an collaborator or an observer.

## Base URL:
🚧 Not in production yet 🚧

## To do

- [x] Adicionar cenários
- [x] Editar símbolos
- [x] Editar nome/descrição do projeto
- [x] Remover cenários
- [x] Remover símbolos
- [x] Ver a questão das restrições
- [x] Ver atores existentes ao adicionar novo ator
- [x] Ver recursos existentes ao adicionar novo recurso
- [x] Checar viabilidade PG -> MongoDB
- [x] Criar e ordenar episódios
- [x] Adicionar usuários ao projeto e implementar permissões
- [x] Criar e ordenar grupos de episódios não sequenciais
- [x] Testar layout de página única com menu lateral na esquerda
- [x] Adicionar ferramentas de edição e texto aos campos textarea
- [ ] Permitir criar projetos públicos/privados
- [ ] Passar todos os inputs para MUi
- [ ] Melhorar UX (não recarregar página ao atualizar informações, poder salvar sem digitar 'Enter' nos ComboBox, etc)
- [ ] Visualizar e rastrear alterações (responsável, data/hora, conteúdo, motivo)
- [ ] Checar responsividade
- [ ] Checar eslint e reaproveitamento de classes, componentes e hooks
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
