const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const config = require('./config/database');
const authentication = require('./routes/authentication')(router); 
const bodyParser = require('body-parser');

//Database Connection
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err)=>{
    if(err){
        console.log("Could not connect to db. Error: "+err);
    }else{
        console.log("Connected to db : "+config.db);
    }
});

//This is all  my Middleware
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json 

//Static directory for front end
app.use(express.static(__dirname+'/client/dist/'));

app.use('/authentication', authentication);

app.get('/',  (req, res) => {
    res.sendFile(path.join(__dirname+'/client/dist/index.html'));
  });


app.listen(8080, ()=>{
    console.log("Listening on Port 8080");
});