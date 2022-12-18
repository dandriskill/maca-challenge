# Maca Coding Challenge
Author: Dan Driskill
Date: Tuesday, Dec 13th, 2022

# Use Cases
* User uploads two or more CSV files (at least two required) in a form on the frontend. API service persists the data, then generates data insights on request.
* Frontend displays insights in a meaningful way.

# Initial Scoping
Scoping Key: (planned) (actual)
## App Implementation
* Create client and server that can communicate with one another (30 min) (~30 min)
* Connect server to a working database and design the database schema according to expected data (1.5 hours) ()
* Build backend route infrastructure and frontend component system (30 minutes) ()

## Uploads
* BE endpoint that receives buffers and file names, returning a success or failure response (30 min) ()
* React form component for uploading two or more files loading/success states (1 hour) ()

## Display Insights
* Build BE insights/charts generator invoked by a GET endpoint (used after successful upload) (45 min) ()
* Program React to fetch insights once they are ready and display them. Build FE routes infrastructure if needed. (1 hour) ()

## What I Would Build if I Had More Time
* Notification for when an upload is complete (no matter where the user is in the app) with a page refresh option to refresh available data insights.
* 

# Instructions

## Create the DB
We are using a PostgreSQL database. Ensure PSQL is on your machine and login.

`psql -U postgres`

Create a new database called "maca" and connect to it.

```
create database maca;
\c maca
```

Database config is found in `.env`, which for the time being is committed to the repository. Additional steps for security would be taken for the production release (containerization or otherwise abstracting the DB configuration).

## Install dependencies
There is a `package.json` file in both the `client` and `server` folders. `npm install` must be run inside both.

## Start the Server
While in the project's root directory, `cd server`, then `node server.js`. The database schema will auto-initialize.

## Start the Client
While in the project's root directory, `cd client`, then `npm run start`.
