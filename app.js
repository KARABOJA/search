'use strict';
//const url = require('Url');
const path = require('path');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Chargement des variable d'environement
require('dotenv').config();

const crawler12 = require('./src/services/crawler');
const _ = require('lodash');
const logger = require('./src/libs/logger');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const compression = require('compression');
const session = require('express-session');

// init databases
// require('./src/services/db');

// Format logs
if (app.get('env') === 'development') {
  app.use(function(req, res, next) {
    logger.debug('%s %s:', _.toUpper(req.method), req.originalUrl);
    logger.debug('- Headers:', JSON.stringify(req.headers));
    logger.debug('- Params:', JSON.stringify(req.params));
    logger.debug('- Query:', JSON.stringify(req.query));
    logger.debug('- Body:', JSON.stringify(req.body));
    return next();
  });
}

// Initialisation de repertoire public
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION
}));

// CORS: same origin policy
app.use(cors());

// Parse json requests' body
app.use(bodyParser.json());

// Parse urlencoded requests' body
app.use(bodyParser.urlencoded({
  extended: true
}));

// Router
app.use(require('./src/routes'));

// Create server
//process.env.PORT = 3000;
const server = http.createServer(app).listen(process.env.PORT, function() {
  logger.info('Lancement du moteur de recherche' + process.env.PORT + ' in ' + app.get('env') + ' mode');
});

// Compression
app.use(compression());

/**
const myURL = new URL( url.parse('https://google.fr'));
const test = crawler12.test2(myURL);
console.log(test);
 */
/**
 * Graceful shutdown
 * @returns {*|void}
 * @private
 */
function _shutdown() {
  logger.info('App termination...');
  return server.close(function() {
    logger.info('http server closed');
    logger.info('App terminated');
    return process.exit(0);
  });
}

process.on('SIGINT', _shutdown);
process.on('SIGTERM', _shutdown);

module.exports = app;
