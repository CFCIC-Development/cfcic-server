# Christ Family Church Server

## Description

Server for Christ Family Center application.

## Running the app

```bash
# development
$ docker compose --profile dev up # Start the local development server
```

> With the docker process running in a separate console, run the following to setup your database

```bash
$ DB_HOST=localhost npx prisma db push # Push changes to your local database
$ DB_HOST=localhost npx prisma db seed # Seed entries into your local database
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Viewing API docs
> Visit the API documentation locally at `http://localhost:8000/docs`
The available endpoints with their required payloads are described there.

