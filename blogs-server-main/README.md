# Blogs Server

## Getting started

### 1. Clone Repository

Run following command in the terminal.

```
git clone https://github.com/SamCarter01/blogs.git
```

### 2. Install dependencies

Navigate to the project's directory:

```
cd blogs-server-main
```

#### Prerequisite : Node.js v18.16

Install dependencies using npm:

```
yarn install
```

### 3. Setup environment variables

Rename `.env.example` file with `.env`.
By default, Database URI is set to:

```
postgresql://root:root@localhost:5432/stratusgrid
```

Make sure to replace `root (username)` & `root (password)` in `DATABASE_URL` with your PostgreSQL username & password set on your local machine.
Default server port is set to 8080. You can change it in env file by changing `PORT` value if 8080 is already in use for your machine.

### 4. Setup, migrate & seed database

Run following commands in the terminal:

```
npx prisma migrate deploy
```

```
npx prisma db seed
```

### 5. Start the server

For production server, run this command:

```
npm start
```

For development server, run this command:

```
npm run dev
```

Server will start at `http://localhost:8080` by default.

## Running test cases

Quit the server if it is running.
Run following command in the terminal.

```
npm run test
```
