# Maca Coding Challenge
Author: Dan Driskill
Date: Tuesday, Dec 13th, 2022

# Use Cases
* User uploads two or more CSV files (at least two required) in a form on the frontend. API service persists the data, then generates data insights on request.
* Frontend displays insights in a meaningful way.

# Initial Scoping
Scoping-Time Key: (planned) (actual)
## App Implementation
* Create client and server that can communicate with one another (30 min) (<30 min)
* Connect server to a working database and design the database schema according to expected data (1.5 hours) (<1 hour)
* Build backend route infrastructure and frontend component system (30 min) (20 min)

## Uploads
* BE endpoint that receives files, returning a success or failure response (30 min) (~10 min)
* React form component for uploading files with loading/success states (1 hour) (30 min)
* BE controller logic to store files to disk and parse file metadata and insights (1.5 hours) (3 hours, due to switching from buffers to the file system halfway through...)

## Display Insights
* Build BE insights/charts generator invoked by a GET endpoint (used after successful upload) (45 min) (~1 hour)
* Program React to fetch insights once they are ready and display them. (1 hour) (1.5 hours, due to work completed for features I ended up removing)

## Unit Tests
(1 hour) (~1 hour)

## What I Would Do if I Had More Time
* Notification for when an upload is complete (no matter where the user is in the app) with a page refresh option to refresh available data insights.
* Separate 'Insights Service' and job queue so the user doesn't have to wait as long on the server to parse insights. Could also take care of merging insights from duplicate deals/leads. Would also be better-positioned to calculate metrics like 'Top 5 Performing Industries Based on Deal Amount.'
* Ability to view a summary of all files that have been uploaded (paginated table).
* Ability to download files that have been uploaded to the system.
* More interactive charts (doughnuts for each revenue report showing percent of contacts with deals and percent with contact info, if it would be useful...)
* Much better styling on the frontend.
* Make chart data more dynamic (for example, only showing the last ten revenue reports, so the chart doesn't get too full)
* Abstract more logic from FE components?
* Come up with more robust data options + insights.
* Reduce unnecessary API requests to the server as a result of React hook re-renders.
* Docker, CI/CD, etc.

## Where I Struggled
* I have not worked extensively with the file system, so it was a learning experience when I had to switch from using Buffers to file paths when I realized it made more sense. Half of my codebase was set up for Buffers, and the other half was using the file system, so that was a painful, costly reversal.
* I was really hoping to have more charts (there is data for it), but I've already spent 7 hours on this and wanted to make sure I had a functioning app. Getting the frontend to behave can be much more costly on scope as well, especially when using lots of data to generate charts. The risk of weird bugs is high.
* I spent too much time on features I thought I would have time for but ended up removing (file viewer, downloader, doughnut charts).

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

## Create Mock Data With Mockaroo for Uploads
Head to Mockaroo [https://mockaroo.com/] and create the following fields:
* id (row number)
* email (Type: Email Address, any blank ratio)
* phone (Type: Phone, any blank ratio)
* address (Type: Address, any blank ratio)
* deal_value (Type: Money, any range, any blank ratio) (most important field)
* industry (OPTIONAL, Type: any, any blank ratio)

`.csv` and `.json` formats allowed by this app. More to come!

Ensure there is a folder called 'files' under '/server'. Node needs this location available to write via file system.

If your data doesn't show up in the dashboard after uploading, hit the 'REFRESH' button under the chart.

Please reach out if something is not working for you. I did my best to think of everything you need to know to run this.
