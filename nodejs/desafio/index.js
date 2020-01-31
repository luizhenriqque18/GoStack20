const express = require('express');

const server = express();

server.use(express.json());

const projets = {id:"", title: "", tasks: []}

server.post('/projects/:id', ( req, res ) => {
    const { id } = req.params;
    const { title } = req.body;

    projets.id = id;
    
    return res.json({"nome": "Luiz"});
});

server.listen(3000);