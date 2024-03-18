# API Documentation
Welcome to the documentation for the Scenarios and Lexicons API. This API serves as a backend for managing scenarios and lexicons inside a project.

## Glossary
- Project: Any domain project, private or public, whose terms and jargon require good collective understanding.
- Lexicons: All the universe of information that belongs to a project.
- Symbol: Term or jargon within a project. It's a type of lexicon.
- Scenario: Specific description of a use case or an interaction between the system and its users. It's a type of lexicon.

## Base URL:
🚧 Not in production yet 🚧

## Endpoints

### Get Project by ID

- Endpoint: /api/project/:id
- Method: GET
- Description: Retrieves a project by its ID.
- Parameters:
  - id (required): The ID of the project.
- Response:
```http
Status: 200 OK
{
    "id": "number",
    "name": "string",
    "description": "string",
    "created_at": "date",
    "updated_at": "date",
    "symbols": [
        {
            "id": "number",
            "name": "string",
            "classification": "string",
            "notion": "string",
            "created_at": "date",
            "updated_at": "date"
        },
      ]
    "scenarios": [
      {
            "id": "number",
            "title": "teste",
            "goal": "teste",
            "created_at": "date",
            "updated_at": "date"
        }
    ]
}
```
- Error Responses:
  - 404 Not Found: If the project with the provided ID does not exist.

### Get All Projects
- Endpoint: /api/project/:projectId
- Method: GET
- Description: Retrieves all projects for a given project.
- Parameters:
  - projectId (required): The ID of the project.
- Response:
```http
Status: 200 OK
Body: Array of project objects (see ### Get Project by ID)
```
- Error Responses:
  - 404 Not Found: If there are no projects for the project.

### Create Project
- Endpoint: /api/project
- Method: POST
- Description: Creates a new project.
- Request:
```http
{
  "name": "string",
  "description": "string"
}
```
- Response:
```http
Status: 201 Created
Body: Created project object (see ### Get Project by ID)
```
- Error Responses:
  - 400 Bad Request: If the request body is invalid.

### Update Project
- Endpoint: /api/project/:id
- Method: PATCH
- Description: Updates a project by its ID.
- Parameters:
  - id (required): The ID of the project.
- Request Body
```http
{
  "name": "string",
  "description": "string"
}
```
- Response:
```http
Status: 200 OK
Body: Updated project object (see ### Get Project by ID)
```
- Error Responses:
  - 400 Bad Request: If the project with the provided ID does not exist or the request body is invalid.

### Delete Project
- Endpoint: /api/project/:id
- Method: DELETE
- Description: Deletes a project by its ID.
- Parameters:
  - id (required): The ID of the project.
- Response:
```http
Status: 200 OK
Body: Message confirming deletion
```
- Error Responses:
  - 400 Bad Request: If the project with the provided ID does not exist.

### Get Symbol by ID

- Endpoint: /api/symbol/:id
- Method: GET
- Description: Retrieves a symbol by its ID.
- Parameters:
  - id (required): The ID of the symbol.
- Response:
```http
Status: 200 OK
{
  "id": "number",
  "name": "string",
  "classification": "string",
  "notion": "string",
  "created_at": "date",
  "updated_at": "date",
  "synonyms": [
      {
          "id": "number",
          "name": "string",
          "created_at": "date",
          "updated_at": "date"
      },
  ],
  "impacts": [
        {
            "id": "number",
            "description": "string",
            "created_at": "date",
            "updated_at": "date"
        },
  ]
}
```
- Error Responses:
  - 404 Not Found: If the symbol with the provided ID does not exist.

### Get All Symbols for a Project
- Endpoint: /api/symbol/project/:projectId
- Method: GET
- Description: Retrieves all symbols for a given project.
- Parameters:
  - projectId (required): The ID of the project.
- Response:
```http
Status: 200 OK
Body: Array of symbol objects (see ### Get Symbol by ID)
```
- Error Responses:
  - 404 Not Found: If there are no symbols for the project.

### Create Symbol
- Endpoint: /api/symbol
- Method: POST
- Description: Creates a new symbol.
- Request:
```http
{
  "name": "string",
  "classification": "string",
  "notion": "string",
  "projectId": "number",
}
```
- Response:
```http
Status: 201 Created
Body: Created symbol object (see ### Get Symbol by ID)
```
- Error Responses:
  - 400 Bad Request: If the request body is invalid.

### Update Symbol
- Endpoint: /api/symbol/:id
- Method: PATCH
- Description: Updates a symbol by its ID.
- Parameters:
  - id (required): The ID of the symbol.
- Request Body
```http
{
  "name": "string",
  "classification": "string",
  "notion": "string",
}
```
- Response:
```http
Status: 200 OK
Body: Updated symbol object (see ### Get Symbol by ID)
```
- Error Responses:
  - 400 Bad Request: If the symbol with the provided ID does not exist or the request body is invalid.

### Delete Symbol
- Endpoint: /api/symbol/:id
- Method: DELETE
- Description: Deletes a symbol by its ID.
- Parameters:
  - id (required): The ID of the symbol.
- Response:
```http
Status: 200 OK
Body: Message confirming deletion
```
- Error Responses:
  - 400 Bad Request: If the scenario with the provided ID does not exist.

### Get Scenario by ID

- Endpoint: /api/scenario/:id
- Method: GET
- Description: Retrieves a scenario by its ID.
- Parameters:
  - id (required): The ID of the scenario.
- Response:
```http
Status: 200 OK
{
  "id": "number",
  "title": "string",
  "goal": "string",
  "created_at": "date",
  "updated_at": "date",
  "exceptions": [
      {
          "id": "number",
          "description": "string",
          "created_at": "date",
          "updated_at": "date"
      }
  ],
  "episodes": [
      {
          "id": "number",
          "position": "number",
          "description": "string",
          "type": "string",
          "created_at": "date",
          "updated_at": "date"
      }
  ],
  "context": {
      "id": "number",
      "preCondition": "string",
      "temporalLocation": "string",
      "geographicLocation": "string",
      "created_at": "date",
      "updated_at": "date",
      "restrictions": [
          {
              "id": "number",
              "description": "string",
              "created_at": "date",
              "updated_at": "date"
          }
      ]
  },
  "resources": [
      {
          "id": "number",
          "name": "string",
          "created_at": "date",
          "updated_at": "date"
      }
  ],
  "actors": [
      {
          "id": "number",
          "name": "string",
          "created_at": "date",
          "updated_at": "date"
      }
  ],
  "groups": [
      {
          "id": "number",
          "position": "number",
          "created_at": "date",
          "updated_at": "date",
          "nonSequentialEpisodes": [
              {
                  "id": "number",
                  "position": 2,
                  "description": "string",
                  "type": "string",
                  "created_at": "date",
                  "updated_at": "date"
              }
          ]
      }
  ]
}
```
- Error Responses:
  - 404 Not Found: If the scenario with the provided ID does not exist.

### Get All Scenarios for a Project
- Endpoint: /api/scenario/project/:projectId
- Method: GET
- Description: Retrieves all scenarios for a given project.
- Parameters:
  - projectId (required): The ID of the project.
- Response:
```http
Status: 200 OK
Body: Array of scenario objects (see ### Get Scenario by ID)
```
- Error Responses:
  - 404 Not Found: If there are no scenarios for the project.

### Create Scenario
- Endpoint: /api/scenario
- Method: POST
- Description: Creates a new scenario.
- Request:
```http
{
  "title": "string",
  "goal": "string",
  "projectId": "number",
}
```
- Response:
```http
Status: 201 Created
Body: Created scenario object (see ### Get Scenario by ID)
```
- Error Responses:
  - 400 Bad Request: If the request body is invalid.

### Update Scenario
- Endpoint: /api/scenario/:id
- Method: PATCH
- Description: Updates a scenario by its ID.
- Parameters:
  - id (required): The ID of the scenario.
- Request Body
```http
{
  "title": "string",
  "goal": "string"
}
```
- Response:
```http
Status: 200 OK
Body: Updated scenario object (see ### Get Scenario by ID)
```
- Error Responses:
  - 400 Bad Request: If the scenario with the provided ID does not exist or the request body is invalid.

### Delete Scenario
- Endpoint: /api/scenario/:id
- Method: DELETE
- Description: Deletes a scenario by its ID.
- Parameters:
  - id (required): The ID of the scenario.
- Response:
```http
Status: 200 OK
Body: Message confirming deletion
```
- Error Responses:
  - 400 Bad Request: If the scenario with the provided ID does not exist.

### Get Scenario with Lexicons
- Endpoint: /api/scenario/:id/with-lexicons
- Method: GET
- Description: Retrieves a scenario with lexicons by its ID.
- Parameters:
  - id (required): The ID of the scenario.
- Response:
```http
Status: 200 OK
{
  "title": {
      "content": "string",
      "foundLexicons": [
          {
              "resource": "string",
              "name": "string",
              "starts": 15,
              "ends": 25,
              "type": "string"
          }
      ]
  },
...
}
```
- Error Responses:
  - 404 Not Found: If the scenario with the provided ID does not exist.

### Create Many Scenarios
- Endpoint: /api/scenario/many
- Method: POST
- Description: Creates multiple scenarios.
- Request Body: Array of scenario data (see ### Create Scenario)
- Response:
```http
Status: 201 Created
Body: Array of created scenarios (see ### Create Scenario)
```
- Error Responses:
  - 400 Bad Request: If the request body is invalid.

### Create Actor
- Endpoint: /api/scenario/actor
- Method: POST
- Description: Creates a new actor.
- Request Body:
```http
{
  "name": "string",
  "scenarioId": "number",
}
```
- Response:
```http
Status: 201 Created
Body: Message confirming creation
```
- Error Responses:
  - 400 Bad Request: If the request body is invalid.

### Create Resource
- Endpoint: /api/scenario/resource
- Method: POST
- Description: Creates a new resource.
- Request Body:
```http
{
  "name": "string",
  "scenarioId": "number",
}
```
- Response:
```http
Status: 201 Created
Body: Message confirming creation
```
- Error Responses:
  - 400 Bad Request: If the request body is invalid.

### Create Exception
- Endpoint: /api/scenario/exception
- Method: POST
- Description: Creates a new exception.
- Request Body:
```http
{
  "description": "string",
  "scenarioId": "number",
}
```
- Response:
```http
Status: 201 Created
Body: Message confirming creation
```
- Error Responses:
  - 400 Bad Request: If the request body is invalid.

### Create Context
- Endpoint: /api/scenario/context
- Method: POST
- Description: Creates a new context.
- Request Body:
```http
{
  "geographicLocation": "string",
  "temporalLocation": "string",
  "preCondition": "string",
  "scenarioId": "number",
}
```
- Response:
```http
Status: 201 Created
Body: Message confirming creation
```
- Error Responses:
  - 400 Bad Request: If the request body is invalid.

### Create Restriction
- Endpoint: /api/scenario/restriction
- Method: POST
- Description: Creates a new restriction.
- Request Body:
```http
{
  "description": "string",
  "episodeId": "number",
  "resourceId": "number",
  "scenarioId": "number",
  "contextId": "number",
}
```
- Response:
```http
Status: 201 Created
Body: Message confirming creation
```
- Error Responses:
  - 400 Bad Request: If the request body is invalid.

### Add Actor to Scenario
- Endpoint: /api/scenario/:scenarioId/actor/:actorId
- Method: POST
 -Description: Adds an actor to a scenario.
- Parameters:
  - scenarioId (required): The ID of the scenario.
  - actorId (required): The ID of the actor.
- Response:
```http
Status: 201 Created
Body: Message confirming addition
```
- Error Responses:
  - 400 Bad Request: If the scenario or actor does not exist.

### Add Resource to Scenario
- Endpoint: /api/scenario/:scenarioId/resource/:resourceId
- Method: POST
- Description: Adds a resource to a scenario.
- Parameters:
  - scenarioId (required): The ID of the scenario.
  - resourceId (required): The ID of the resource.
- Response:
```http
Status: 201 Created
Body: Message confirming addition
```
- Error Responses:
  - 400 Bad Request: If the scenario or resource does not exist.

### Delete Actor
- Endpoint: /api/scenario/actor/:id
- Method: DELETE
- Description: Deletes an actor by its ID.
- Parameters:
  - id (required): The ID of the actor.
Response:
```http
Status: 200 OK
Body: Message confirming deletion
```
- Error Responses:
  - 400 Bad Request: If the actor with the provided ID does not exist.

### Delete Resource
- Endpoint: /api/scenario/resource/:id
- Method: DELETE
- Description: Deletes a resource by its ID.
- Parameters:
  - id (required): The ID of the resource.
Response:
```http
Status: 200 OK
Body: Message confirming deletion
```
- Error Responses:
  - 400 Bad Request: If the resource with the provided ID does not exist.

### Delete Exception
- Endpoint: /api/scenario/exception/:id
- Method: DELETE
- Description: Deletes an exception by its ID.
- Parameters:
  - id (required): The ID of the exception.
- Response:
```http
Status: 200 OK
Body: Message confirming deletion
```
- Error Responses:
  - 400 Bad Request: If the exception with the provided ID does not exist.

### Delete Context
- Endpoint: /api/scenario/context/:id
- Method: DELETE
- Description: Deletes a context by its ID.
- Parameters:
  - id (required): The ID of the context.
- Response:
```http
Status: 200 OK
Body: Message confirming deletion
```
- Error Responses:
  - 400 Bad Request: If the context with the provided ID does not exist.

### Delete Restriction
- Endpoint: /api/scenario/restriction/:id
- Method: DELETE
- Description: Deletes a restriction by its ID.
- Parameters:
  - id (required): The ID of the restriction.
- Response:
```http
Status: 200 OK
Body: Message confirming deletion
```
- Error Responses:
  - 400 Bad Request: If the restriction with the provided ID does not exist.

### Delete Episode
- Endpoint: /api/scenario/episode/:id
- Method: DELETE
- Description: Deletes an episode by its ID.
- Parameters:
  - id (required): The ID of the episode.
- Response:
```http
Status: 200 OK
Body: Message confirming deletion
```
- Error Responses:
  - 400 Bad Request: If the episode with the provided ID does not exist.

### Delete Group
- Endpoint: /api/scenario/group/:id
- Method: DELETE
- Description: Deletes a group by its ID.
- Parameters:
  - id (required): The ID of the group.
- Response:
```http
Status: 200 OK
Body: Message confirming deletion
```
- Error Responses:
  - 400 Bad Request: If the group with the provided ID does not exist.

### Remove Actor from Scenario
- Endpoint: /api/scenario/:scenarioId/actor/:actorId
- Method: DELETE
- Description: Removes an actor from a scenario.
- Parameters:
  - scenarioId (required): The ID of the scenario.
  - actorId (required): The ID of the actor.
- Response:
```http
Status: 200 OK
Body: Message confirming removal
```
- Error Responses:
  - 400 Bad Request: If the actor or scenario does not exist.

### Remove Resource from Scenario
- Endpoint: /api/scenario/:scenarioId/resource/:resourceId
- Method: DELETE
- Description: Removes a resource from a scenario.
- Parameters:
  - scenarioId (required): The ID of the scenario.
  - resourceId (required): The ID of the resource.
- Response:
```http
Status: 200 OK
Body: Message confirming removal
```
- Error Responses:
  - 400 Bad Request: If the resource or scenario does not exist.

## Error Handling
All endpoints handle errors gracefully and return appropriate HTTP status codes along with error messages.

## Logging
The API logs errors for debugging purposes.

## Author
Created by [Daniel Vinícius](https://github.com/danvinicius) | <viniccius774@gmail.com>

## License
This project is licensed under the [MIT License](https://opensource.org/license/mit) - see the LICENSE file for details.
