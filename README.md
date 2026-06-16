# Full-Stack Blogging Platform

A TypeScript blogging application with a React client and an Express API. Users can register, sign in, browse and search posts, and publish new articles through an authenticated workflow backed by PostgreSQL and Prisma.

The repository keeps the browser and API applications separate while providing root commands for running them together.

## What it demonstrates

- JWT-based registration and sign-in
- Password hashing with bcrypt
- Protected post creation
- Post listing and case-insensitive title search
- Shared request validation with Yup
- PostgreSQL persistence through Prisma
- React routing, authentication state, and Formik forms
- API and UI test suites

## Architecture

```text
React + Material UI
blogs-web-main
       |
       | JSON over /api
       v
Express + TypeScript
blogs-server-main
       |
       | Prisma
       v
PostgreSQL
```

### Backend

`blogs-server-main` exposes authentication and post routes under `/api`. Controllers validate input, use Prisma for persistence, and return a consistent response envelope. Authentication middleware verifies the `authtoken` header before protected post operations.

### Frontend

`blogs-web-main` is a React 18 application with authenticated and unauthenticated route groups. Formik and Yup handle forms, Axios provides the API boundary, and Material UI supplies the component system.

## Repository map

```text
.
├── blogs-server-main/
│   ├── prisma/              # Schema, migration, and seed data
│   ├── src/controllers/     # Authentication and post use cases
│   ├── src/middlewares/     # JWT authentication
│   ├── src/routes/          # Express route composition
│   └── tests/               # API integration tests
├── blogs-web-main/
│   └── src/
│       ├── components/      # Forms, navigation, and post UI
│       ├── contexts/        # Authentication state
│       ├── pages/           # Sign-in, sign-up, posts, and editor
│       └── services/        # Axios API clients
└── package.json             # Combined development commands
```

## Local setup

### Prerequisites

- Node.js 18
- Yarn
- PostgreSQL

Clone the repository and install all three workspaces:

```bash
git clone https://github.com/alirazawatoo/fullstack-blogging-platform.git
cd fullstack-blogging-platform
yarn install
yarn install-server
yarn install-web
```

Create local environment files from the tracked samples:

```bash
cp blogs-server-main/.env.sample blogs-server-main/.env
cp blogs-web-main/.env.sample blogs-web-main/.env
```

Update `DATABASE_URL` and `JWT_KEY` in the server environment before continuing. Then apply the tracked migration and seed the database:

```bash
cd blogs-server-main
npx prisma migrate deploy
npx prisma db seed
cd ..
```

Start both applications from the repository root:

```bash
yarn start
```

The client defaults to `http://localhost:3000`; the API defaults to `http://localhost:8080/api`.

## API surface

| Method | Route | Purpose | Authentication |
| --- | --- | --- | --- |
| `POST` | `/api/auth/signup` | Register a user | No |
| `POST` | `/api/auth/login` | Return a JWT | No |
| `GET` | `/api/posts` | List or search posts | See route middleware |
| `POST` | `/api/posts` | Publish a post | JWT header |

The exact middleware placement is defined in `blogs-server-main/src/routes`.

## Tests

```bash
cd blogs-server-main && yarn test
cd ../blogs-web-main && yarn test
```

Backend tests exercise authentication and post endpoints. Frontend tests cover the sign-in, sign-up, posts, and new-post pages. These are the intended commands; test results are not claimed here unless reproduced in the target environment.

## Design decisions

- **Separate deployable applications:** the web client and API can be developed or hosted independently.
- **Prisma schema as the data contract:** user ownership and timestamps are explicit in the persisted model.
- **Validation at both boundaries:** Yup schemas provide immediate browser feedback and server-side enforcement.
- **Small service layer in the client:** components do not construct HTTP requests directly.
- **Consistent API responses:** shared helpers keep success and error payloads predictable.

## Current boundaries

- JWTs are stored client-side and sent through a custom header; an HTTP-only cookie strategy would reduce exposure.
- The API starts its listener in the same module that exports the Express app, which makes isolated testing and server lifecycle management harder.
- Posts support creation and discovery, but not editing, deletion, pagination, drafts, or rich-text sanitization.
- The sample environment contains development defaults and must not be reused for a public deployment.

## Next improvements

1. Separate app construction from process startup and centralize the Prisma client lifecycle.
2. Add ownership-aware update and delete operations.
3. Introduce pagination and stable sorting for the post feed.
4. Move authentication to secure cookies with expiry and rotation.
5. Add a containerized PostgreSQL development option only if repeatable onboarding becomes a priority.
