# Docker Database Setup Guide

This document describes how to set up and manage the PostgreSQL database for the backend using Docker.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
- [Bun](https://bun.sh/) runtime installed.

## Getting Started

### 1. Start the Database Container

To spin up the PostgreSQL database in the background, run the following command from the backend directory:

```bash
docker compose up -d
```

This will:
- Pull the lightweight `postgres:16-alpine` image.
- Create and start a container named `higgs-postgres`.
- Map port `5432` on your host machine to port `5432` in the container.
- Set up a persistent volume named `postgres_data` so your data persists even if the container is stopped or removed.

### 2. Verify the Database is Running

Ensure the container is running by listing active Docker containers:

```bash
docker ps
```

You should see `higgs-postgres` in the list of running containers.

### 3. Apply Database Migrations

Once the container is active, apply the Prisma schema to the database:

```bash
bunx prisma db push
```

---

## Helpful Commands

### View Container Logs
To monitor database startup logs or debug connection issues, run:
```bash
docker compose logs -f
```

### Stop the Database
To stop the PostgreSQL container without deleting database data:
```bash
docker compose stop
```

### Start the Database (after stopping)
To start it back up:
```bash
docker compose start
```

### Remove the Container
To stop and remove the container along with its network configuration (your data will still be safe in the volume):
```bash
docker compose down
```

### Remove the Container and Data Volume
To wipe the database entirely and start fresh (this deletes all database contents):
```bash
docker compose down -v
```

---

## Next Steps

To learn how to query the database tables, check out the [PostgreSQL psql Guide](file:///d:/CPP/100xcode/web/FullStackProjects/higgsfield/apps/backend/postgresREADME.md).

