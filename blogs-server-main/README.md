# Blogs API

The backend for the [Full-Stack Blogging Platform](../README.md), built with Express, TypeScript, Prisma, and PostgreSQL.

## Setup

```bash
cp .env.sample .env
yarn install
npx prisma migrate deploy
npx prisma db seed
yarn dev
```

The API defaults to `http://localhost:8080/api`. Set a private `JWT_KEY`, a valid PostgreSQL `DATABASE_URL`, and the client origin in `REACT_APP_URL` before starting it.

## Tests

```bash
yarn test
```

See the root README for the route summary, architecture, security boundaries, and full application setup.
