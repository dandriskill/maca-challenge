require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 8080;
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes/router');
const { pool } = require('./db');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Router
app.use('/api/v1', router);

app.listen(PORT, () => console.log('We are running on ' + PORT + '!'));

// On server shutdown, close all databse connections
process.on('SIGINT', () => {
    console.log('Closing all database connections...');
    pool.end();
    process.exit();
});
