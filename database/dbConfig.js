const knex = require('knex');
const config = require('../knexfile.js');
require('dotenv').config();

// decides which environment runs in our knexfile
const environment = process.env.DB_ENV || 'development';

module.exports = knex(config[environment]);
