# Christ Family Church Server

## Description

Server for Christ Family Center application.

## Requirements
[Install Docker (Linux OS)](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/How-to-install-Docker-and-docker-compose-on-Ubuntu)

[Install Docker (Windows)](https://www.makeuseof.com/how-to-install-docker-windows-10-11/)

[Install Docker](https://docs.docker.com/desktop/install/mac-install/)

## Running the app

```bash
# development
$ docker compose --profile dev up # Start the local development server
```

> With the docker process running in a separate console, run the following to setup your database

```bash
docker exec -it dev_server DB_HOST=localhost npx prisma db push # Push changes to your local database
docker exec -it dev_server DB_HOST=localhost npx prisma db seed # Seed entries into your local database
```

## Test

```bash
# unit tests
docker exec -it dev_server npm run test

# e2e tests
docker exec -it dev_server npm run test:e2e

# test coverage
docker exec -it dev_server npm run test:cov
```

## Viewing API docs
> Visit the API documentation locally at `http://localhost:8000/docs`
The available endpoints with their required payloads are described there.

## Creating new migration

```bash
docker exec -it dev_server npx prisma migrate dev
```