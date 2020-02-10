const { Router } = require('express');

const routes = new Router();

const User = require('./app/models/User');

routes.get('/', async (req, res) => {
    const user = await User.create({
        name: 'Luiz Henrique Oliveira de Souza',
        email: 'luizhenriqque15@gmail.com',
        password_hash: '1234567889',
    });

    return res.json(user);
});

module.exports = routes;
