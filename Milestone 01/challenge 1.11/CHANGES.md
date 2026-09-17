# Refactoring Changes

## Variable Renames

| Old Name | New Name | Why |
|---|---|---|
| `x` | `confessionIdCounter` | Clearly describes the counter used to generate confession IDs |
| `d` | `confessionData` | Describes the request body containing confession data |
| `r` | `routeParams` | Describes the route parameters |
| `t` | `operation` | Describes the operation being performed |
| `arr` | `sortedConfessions` | Describes the sorted confession collection |
| `tmp` | `newConfession` | Describes the newly created confession |
| `i` | `confessionId` | Describes the confession ID being searched |
| `cat` | `category` | Clearly describes the category parameter |
| `cats` | `validCategories` | Describes the list of allowed categories |
| `stuff` | `categoryConfessions` | Describes confessions belonging to the selected category |
| `res2` | `deletedConfessions` | Describes the result returned after deletion |
| `handler` | `confessionIndex` | Describes the index of the confession in the array |

## Function Splits

To be completed during the function-splitting stage.

## MVC Refactoring

To be completed during the MVC stage.

## Environment Variables

To be completed during the environment-variable stage.

## Comments

To be completed during the commenting stage.
## MVC Architecture

The original monolithic `app.js` was separated into three layers:

### Routes
`routes/confessionRoutes.js`

Responsible for defining the API endpoints and connecting them to controllers.

### Controllers
`controllers/confessionController.js`

Responsible for handling HTTP requests and responses.

### Services
`services/confessionService.js`

Responsible for confession validation and data operations.

### Why?

Separating routes, controllers and services makes the application easier to understand, maintain and extend.

## Environment Variables

Moved configuration values from source code into `.env`.

### Environment variables

- `PORT` - controls the server port.
- `DELETE_TOKEN` - stores the token required for deleting confessions.

### Security

Added `.env` to `.gitignore` so the delete token is not committed to Git.