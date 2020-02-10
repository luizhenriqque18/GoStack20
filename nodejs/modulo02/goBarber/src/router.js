const { Router } = require('express');
const UserController = require('./app/controller/UserController');
const User = require('./app/models/User');

const routes = new Router();

routes.post('/users', UserController.store);

module.exports = routes;
