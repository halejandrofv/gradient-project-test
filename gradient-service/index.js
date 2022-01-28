const express = require('express');
const cors = require('cors');
const fs = require('fs');
const file = './data.json';
const {v4:uudiv4} = require('uuid');

const port = 8080;

// Create express server instance
const app = express();

// Configure CORS
app.use( cors() );

// body Parse and Read using use (Middleware)
app.use( express.json());

// Routes
app.get("/template", (req, res) => {

    const info = fs.readFileSync(file,{encoding: 'utf-8'});
    const data = JSON.parse(info);
    console.log(data);

    res.json({
        error: false,
        result: data
    });
});
app.post("/template", (req, res) => {
    const body = {
        id: uudiv4(),
        name: req.body.name,
        created_by: req.body.created_by,
        style: req.body.style
    }
    const info = fs.readFileSync(file,{encoding: 'utf-8'});
    const data = JSON.parse(info);
    allData = data.concat(body);
    fs.writeFileSync(file, JSON.stringify(allData));

    //const resp = fs.readFileSync(file,{encoding: 'utf-8'});
    res.json({
        error: false,
        result: [body]
    });
    
});

// Server
app.listen(port, ()=>{
    console.log(`Server Run in port ${port}`)
});

