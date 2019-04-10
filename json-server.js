const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./schema.json');
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// Use default middlewares (CORS, static, etc)
server.use(middlewares);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// API routes
server.use(router);

// Start server
server.listen(3000, () => {
  console.log('JSON Server is running');
});
