# PostgreSQL psql Cheat Sheet & Guide

This guide covers how to connect to and interact with your Dockerized PostgreSQL database using the `psql` command-line utility.

## Connecting to the Database

Since your database is running inside a Docker container, you can connect to it either from your host machine (if you have `psql` installed locally) or directly inside the container.

### Option A: Connect from inside the Docker Container (Recommended)
You do not need to install `psql` on your host machine for this. Run:

```bash
docker exec -it higgs-postgres psql -U postgres -d higgs
```

### Option B: Connect from your Host Machine
If you have PostgreSQL client tools installed locally, run:

```bash
psql -h localhost -U postgres -d higgs
```
*(It will prompt you for the password: `bhashivpaw098`)*

---

## Essential psql Commands

Once connected (when your prompt looks like `higgs=#`), you can run the following meta-commands:

| Command | Description |
| :--- | :--- |
| `\l` | List all databases |
| `\c <database_name>` | Connect to a different database |
| `\dt` | List all tables (relations) in the current database |
| `\d <table_name>` | Describe a table's schema (columns, types, indexes) |
| `\q` | Quit / Exit psql |

---

## Useful SQL Queries for this Project

### 1. View Registered Users
```sql
SELECT * FROM "User";
```

### 2. View Created Avatars
```sql
SELECT * FROM "Avatar";
```

### 3. View Video Generation History
```sql
SELECT * FROM "AvatarVideo";
```

### 4. Delete All Users (Reset Auth)
```sql
TRUNCATE TABLE "User" CASCADE;
```

---

## Tips & Troubleshooting

- **Double Quotes (`"User"`)**: PostgreSQL is case-sensitive for table names. Because Prisma names the table `User` with a capital `U`, you must wrap it in double quotes (`"User"`) in your SQL queries.
- **Toggle Expanded Auto-wrap**: If query outputs are too wide for your terminal, press `\x` to toggle expanded display (useful for viewing long fields like hashed passwords).
