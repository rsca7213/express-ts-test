# Express TypeScript API Example

![CI/CD Actions](https://github.com/rsca7213/express-ts-test/actions/workflows/api.yml/badge.svg)

This is a simple example of an Express API written in TypeScript.

## 📚 Prerequisites - Before installing and running the API

- Install the latest LTS of Node.js from [Node.js](https://nodejs.org/en/)
- This should also install npm, the Node.js package manager
- Install PostgreSQL database manager from [PostgreSQL](https://www.postgresql.org/download/)
- Clone this repository to your local machine

## 🛠️ Installation

- Open a terminal and navigate to the root of the cloned repository

  `cd /path/to/express-ts-test`

- Install the required npm packages

  `npm install`

- Create a `.env` file in the root of the project. You can copy the `example.env` file and rename it to `.env`

  `cp example.env .env`

## 🗃️ Configuring the PostgreSQL database

- Create a new database in PostgreSQL, preferably with encoding `UTF8`

  `CREATE DATABASE express_ts_test WITH ENCODING 'UTF8';`

- Run the migrations from our Prisma ORM Schema to create the tables in the database

  `npx prisma migrate dev`

- Seed the database with some initial data (⚠️ Don't run this command on a production database, as it will create administrative users with default passwords)

  `npx prisma db seed`

- Add the database connection string to the `.env` file

  `DATABASE_URL=postgresql://username:password@localhost:5432/express_ts_test`

## 🚀 Running the API in development mode

- Start the API in development mode

  `npm run start:dev`

- The API will be running on `http://localhost:PORT` where `PORT` is the port number specified in the `.env` file

## 🚀 Running the API in production mode

- Build the API to generate a production ready build

  `npm run build`

- Start the API in production mode

  `npm run start:prod`

- The API will be running on `http://localhost:PORT` where `PORT` is the port number specified in the `.env` file

## 📃 Reading the OpenAPI documentation (Swagger UI)

- To read the OpenAPI documentation, first start the API in development mode

  `npm run start:dev`

- Then, open a browser and navigate to `http://localhost:PORT/docs` where `PORT` is the port number specified in the `.env` file

## ✅ Linting the code

- Run the linter to check for any linting errors

  `npm run lint`

- Run the linter to fix any linting errors

  `npm run lint:fix`

## 🎨 Formatting the code

This project uses Prettier to format the code to a consistent style. To format the code, you must do the following:

- Install the Prettier extension in your code editor

- Configure Prettier to format the code on save in your code editor

- You're all set! Now, every time you save a file, Prettier will format the code to a consistent style

## 📦 Project dependencies

- Express.js v4.19.2 or higher
- TypeScript v5.3.3 or higher
- Prisma v5.11.0 or higher
- PostgreSQL v15.3 or higher
- Node.js LTS v20.11.1 or higher
- npm v10.5.0 or higher
