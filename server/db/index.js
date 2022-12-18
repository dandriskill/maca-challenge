const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// Production env check in place for future needs
const isProduction = process.env.NODE_ENV === 'production';

// Connection config found in .env, may eventually move to a docker file
const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

// Utilizing 'pool' to reuse existing connections for each query (improves performance)
const pool = new Pool({
  connectionString: isProduction
    ? process.env.DATABASE_URL // Here to show how we would handle connection string for production, but not currently defined
    : connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

// Query callback for all queries to the database
const query = (text, params) => pool.query(text, params);

// Set up tables
const sql = fs.readFileSync(path.resolve(__dirname, './db.sql')).toString();
query(sql, (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log('Database tables created:\n', res.rows);
  }
});

// Make pool scope accessible for the server
module.exports = {
  pool,
  query,
};
