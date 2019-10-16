const express = require('express'); 
const app = express(); 

const users = ["Willian", "Diego", "Robson"]; 

app.use(express.json());

//Middleware

//Global
app.use((req, res, next) => {
    console.time("Request"); 
    console.log(`Method: ${req.method}; URL: ${req.url}`); 
    
    next(); 

    console.timeEnd("Request");
}); 

//Local
function checkUserExists( req, res, next){
    if (!req.body.name) {
        return res.status(400).json({ error: "name is required"}); 
    }; 

    next();
};


function checkUserInArray(req, res, next){    
    const user = users[req.params.index]; 
       
    if (!user){
        return res.json({error: "User not found."})
    }
    
    req.user = user;

    return next();
};

app.get('/users', checkUserInArray, (req, res) =>{
    return res.json({users});
}); 

app.post('/users', checkUserExists,(req, res) =>{
    const { name } = req.body; 
    
    users.push(name);
    
    return res.json({users});
}); 

app.get('/users/:index', checkUserInArray, (req, res) =>{
    return res.json(req.user);
}); 

app.put('/users/:index', checkUserInArray, checkUserExists, (req, res) =>{
    const { index } = req.params;
    const { name } = req.body; 
    
    users[index] = name; 
    
    return res.json(users);
}); 

app.delete('/users/:index', checkUserInArray, (req, res) =>{
    const { index } = req.params; 

    users.splice(index,1); 
    
    return res.send();
}); 


app.listen(3000, () => console.log('Server is running...')); 