const express = require('express');

const server = express();

server.use(express.json());

server.use((req, res, next) => {

    console.count('Número de requisições');

    return next();
});

const projects = [{id:"", title: "", tasks: []}];

function checkInId (req, res, next){
    const { id } = req.params;
    if(!id){
        return res.status(400).json("Id não de ser nulo.");
    }
    
    const index = projects.findIndex( project => project.id === id);
    
    if(index == -1){
        return res.status(400).json("Id não existe na base.");
    }

    req.params.index = index;

    return next();
}

server.post('/projects', ( req, res ) => {
    const { id, title } = req.body;

    projects.push({id, title, tasks: []});
    
    return res.json(projects);
});

server.post('/projects/:id/tasks', checkInId, ( req, res ) => {
    const { index } = req.params;
    const { tasks } = req.body;

    projects[index].tasks = tasks;
    
    return res.json(projects);
});

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.put('/projects/:id', checkInId, (req, res) => {
    const { title } = req.body;
    const { index } = req.params;

    projects[index].title = title;

    return res.json(projects);
});

server.delete('/projects/:id', checkInId, (req, res) => {
    const { index } = req.params;

    projects.splice(index, 1);
    
    return res.json(projects);
});

server.listen(3000);