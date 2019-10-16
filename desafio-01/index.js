const express = require('express'); 
const app = express(); 

app.use(express.json());  

let RequestNumber = 0;
const Projects = []; 

//Middlewares
function checkID (req, res, next){
    const { id } = req.params; 
    const filter = Projects.filter((p)=> p.id == id);
    if (filter.length==0){
        return res.status(404).json({error:"Project don't exist in projects."}); 
    }
    next();
}; 

//middleware Global for count request numbers to server and logs
app.use((req, res, next)=>{
    RequestNumber++;
    console.log(`${req.method} - ${req.originalUrl}: Request Count:${RequestNumber} `);
    next();
}); 



//Routes
app.get('/projects', (req, res) => {    
    return res.json(Projects); 
}); 

app.post('/projects', (req, res) => {
    const { id, title } = req.body; 
    if(!id || !title){
        return res.status(404).json({error: "id and title is required."});
    }
    const project = {id, title, tasks:[]};
    Projects.push(project);
    return res.json(project); 
}); 

app.put('/projects/:id', checkID,(req, res) => {    
    const { id, title } = req.body; 
    const project = Projects.find(p => p.id== parseInt(id)); 
    
    project.title = title; 
    
    return res.json(project);  
}); 

app.delete('/projects/:id', checkID,(req, res) => {
    const project = Projects.find(p => p.id== parseInt(req.params.id)); 
    const index  = Projects.indexOf(project);
    Projects.splice(index, 1);
    return res.send();
}); 

app.post('/projects/:id/tasks',checkID, (req, res) => {
    const { id } = req.params; 
    const { title } = req.body; 
    
    const project = Projects.find(p => p.id == parseInt(id)); 
    
    project.tasks.push(title); 
    
    return res.json(project);
}); 

app.listen(3000, () => console.log('Server is running in port 3000...')); 
