## module 01 Bootcamp
NodeJS Express Application as RocketSeat module one from GoStack Bootcamp.

This application is used to store users.

## Routes

- `POST /users`: Receives `name` inside the request body in order to register a new user: `{ name: 'name Example'}`;

- `GET /users`: Lists all users.

- `GET /users/:index`: List one users by `index` passed as a route parameter.

- `PUT /users/:index`: Changes only the user `name` for specified list user `index` passed as a route parameter.

- `DELETE /users/:index`: Deletes the user with the specified `index`.

### Example

Calling `POST /users` passing `{ name: 'Ryan Dahl' }`, the `users` array should be like that:

```js
[
  "Ryan Dahl"
]
```