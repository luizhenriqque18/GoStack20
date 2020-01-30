const express = require('express');

const server = express();

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
//?
const users = ['Luiz H', 'Maria', 'Renato', 'Mauriceia'];
server.get('/users/:index', (req, res) => {
    const { index } = req.params;

    return res.json({id: index, user: users[index]});
}); 





server.listen(3000);