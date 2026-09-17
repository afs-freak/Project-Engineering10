# Pre-Refactor Audit

## 1. Meaningless Variable Names

Several variables have vague or unclear names:

- `x` is used as the confession ID counter.
- `d` is used for request body data.
- `r` is used for route parameters.
- `t` is used to identify the requested operation.
- `arr` is used for the sorted confession list.
- `tmp` is used for a newly created confession.
- `i` is used for a confession ID.
- `cat` is used for a category parameter.
- `cats` is used for the list of valid categories.
- `stuff` is used for filtered category results.
- `res2` is used for the deleted confession result.
- `handler` is used for the index of a confession.

These names make the code harder to understand and maintain.

## 2. Monolithic handleAll() Function

The `handleAll()` function handles multiple unrelated responsibilities:

- Creating confessions
- Validating confession data
- Getting all confessions
- Getting one confession
- Filtering confessions by category
- Deleting confessions
- Authorization
- Sorting data
- Formatting API responses
- Logging
- Error handling

The function should be split into smaller functions with one responsibility each.

## 3. Routing and Business Logic Are Mixed

The application contains routing logic, request handling, validation, business logic, data manipulation, authorization, logging and response handling inside `app.js`.

This makes the application difficult to maintain and extend.

## 4. No MVC Folder Structure

The project does not have separate:

- `routes/`
- `controllers/`
- `services/`

The different responsibilities should be separated into these layers.

## 5. Hardcoded Port

The application uses a hardcoded port:

```js
app.listen(3000)