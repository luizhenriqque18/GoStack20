const { Router } = require('express');
const UserController = require('./app/controller/UserController');
const SessionController = require('./app/controller/SessionController');
const authMiddlewares = require('./app/middlewares/auth');

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddlewares); // aparte dessa linha sera necessario a validação por token.

routes.put('/users', UserController.update);

module.exports = routes;
