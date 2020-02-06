const { Router } = require('express');

const routes = new Router();

routes.get('/', (req, res) => res.json({ msg: 'Olá, Mundo. Obrigado Deus.' }));

module.exports = routes;
