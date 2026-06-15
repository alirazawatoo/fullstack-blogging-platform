# Blogs Application Setup Guide

## Project Description

The Blogs Application is a full-stack web application built with Node.js, Prisma, TypeScript and React. It provides a platform for users to create and manage their blogs. The backend is powered by Prisma for database management, while the frontend is developed using TypeScript and React.

**Requirements:**
- Node.js v16 or above
- npm (Node Package Manager)
- Prism
-PostgreSQL

**Installation Steps:**

1. Clone the repository:
   ```
   git clone https://github.com/SamCarter01/blogs.git
   cd blogs
   ```

2. Install project dependencies:
   ```
   yarn install-server
   yarn install-web
   yarn install
   ```

3. Install Prisma globally:
   ```
   yarn install -g prisma
   ```

4. Setup environment variables:
    In both directories `blogs-server-main` & `blogs-web-main`
   - Copy `.env.example` and rename it to `.env`.
   - Update environment variables as needed.
   By default, Database URI is set to:

    ```
    postgresql://root:root@localhost:5432/stratusgrid
    ```

    Make sure to replace `root (username)` & `root (password)` in `DATABASE_URL` with your PostgreSQL username & password set on your local machine.
    Default server port is set to 8080. You can change it in env file by changing `PORT` value if 8080 is already in use for your machine.


5. Setup Prisma:
    In `blogs-server-main` directory run the following commands:

   ```
   npx prisma migrate deploy
   npx prisma db seed
   ```

6. Start the application:
   In `blogs` directory run the following command:

   ```
   yarn start
   ```
**Default User:**

User Email: `johndoe@example.com`
User Password: `KPAfeb24!`


**Running Test Cases:**

To run test cases in the `blogs-server-main` directory run the following commands:
```
yarn test
```

The application will be accessible at http://localhost:3000.

Feel free to reach out if you encounter any issues or need further assistance.
