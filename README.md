
## Backend

**Base Directory:** `./backend`

### Install Dependencies

1. Navigate to the `backend` directory - `cd backend`
1. Run `npm install`

### Set Environment Variables

1. Navigate to the `backend` directory - `cd backend`
2. Create `<environment-name>.env` file inside the `env` directory.
3. Open `sample.env` file.
4. Copy all **REQUIRED** env variables and paste them inside your current env file created in step #2.
5. Set values for all the env variables you just copied in step #4.

### Database Setup

1. Create a new Postgres database `extr`.
2. Navigate to the `backend` directory - `cd backend`
3. Run this to generate DB structure - `DATABASE_URL=postgres://<USERNAME>:<PASSWORD>@<HOSTNAME>:<PORT>/extr npm run migrate up`

## Bootstrapping API Server

1. Navigate to the `backend` directory - `cd backend`
2. Run `npx tsc` to build the application for the first time.
4. Run `npm run watch:js` to turn on the watch mode for TS files.
3. Run `npm start`
