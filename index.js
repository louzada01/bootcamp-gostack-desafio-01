const express = require('express');

const app = express();

const projects = []

app.use(express.json())


/*
* 
* Verifica se o ID existe
*
*/
function checkProjectExists(req, res, next) {
    const { id } = req.params;

    const project = projects.find(p => p.id == id);
    if (!project) {
      return res.status(400).json({ error: 'O rojeto não foi encontrado' });
    }
  
    return next();
}

/*
* 
* Retorna log no número de requisições
*
*/
function logRequests(req, res, next) {

    console.count("Número de requisições");
  
    return next();
  }

/*
* 
* Lista todas as tarefas
*
*/

app.use(logRequests);

app.get('/projects', (req, res) => {
    return res.status(201).json(projects);
});

/*
* 
* Cria uma tarefa 
*
*/

app.post('/projects', (req, res) => {
    const {id, title, tasks } = req.body;

    projects.push({
        id,
        title,
        tasks
    });

    return res.status(201).json({
        message: "Tarefa cadastrada com sucesso",
        projects,
    });
});

/*
* 
* Edita uma tarefa criada
*
*/

app.put('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
  
    const project = projects.find(p => p.id == id);
  
    project.title = title;
  
    return res.json(project);
});

/*
* 
* Deleta uma tarefa com o ID
*
*/

app.delete('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
  
    const projectIndex = projects.findIndex(p => p.id == id);
  
    projects.splice(projectIndex, 1);
  
    return res.status(201).json({
        message: "Tarefa excluida com sucesso",
        projects,
    });
  });

/*
* 
* Adiciona uma tarefa a um id
*
*/

app.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
  
    const project = projects.find(p => p.id == id);
  
    project.tasks.push(title);
  
    return res.status(201).json({
        message: "Tarefa adicionada com sucesso",
        projects,
    });
});

/*
* 
* Deleta uma tarefa criada em um id
*
*/
app.delete('/projects/:id/tasks', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
  
    const project = projects.find(p => p.id == id);
    const taskIndex = project.tasks.findIndex(t => t == title);
    project.tasks.splice(taskIndex, 1);
    return res.status(201).json({
        message: "Tarefa adicionada com sucesso",
        projects,
    });
});


app.listen(3000);