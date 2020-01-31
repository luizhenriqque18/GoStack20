const express = require('express');

const server = express();

server.use(express.json());

//Query params  = ?teste=1
server.get('/exemplo1', (req, res) => {
    const { nome } = req.query;
    
    return res.json({ msg: `Olá, Mundo ${nome}`});
}); 

//Route params  = /teste/1
server.get('/exemplo2/:id', (req, res) => {
    const { id } = req.params;

    return res.json({ msg: 'Luiz Henrique', id});
}); 


//Request body = { "name": "luiz", "email": "diego@gmail.com"}
server.post('/exemplo3', (req, res) => {
    const { nome } = req.body;

    return res.json({ msg: nome});
}); 


//CRUD

server.use( (req, res, next) => {
    console.time('Request');
    console.log(`Methed: ${req.method} URL: ${req.url}`);
    next();
    console.timeEnd('Request');
});


function middlewaresCheckUserExists(req, res, next){
    if(!req.body.nome){
        return res.status(400).json("Nome is required");
    }

    return next();
}

function middlewaresCheckUserInArray(req, res, next){
    const user = users[req.params.id];

    if(!user){
        return res.status(400).json({error: 'User does not exists'});
    }

    req.user = user;

    return next();
}

const users = ['Luiz H', 'Maria', 'Renato', 'Mauriceia'];

server.get('/users', (req, res) => {

    return res.json(users);
}); 

server.get('/users/:id', middlewaresCheckUserInArray, (req, res) => {

    return res.json(req.user);
}); 

server.post('/users', middlewaresCheckUserExists, (req, res) => {
    const { nome } = req.body;
    users.push(nome);

    return res.json(users);
});

server.put('/users/:id', middlewaresCheckUserExists, (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    users[id] = nome;

    return res.json(users);
}); 

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    users.splice(id, 1);

    return res.json(users);
}); 

server.listen(3000);