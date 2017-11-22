const express = require('express');
const app = express();
const path = require('path');
const config = require('./config/database');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err)=>{
    if(err){
        console.log("Could not connect to db. Error: "+err);
    }else{
        console.log("Connected to db : "+config.db);
    }
});

app.use(express.static(__dirname+'/client/dist/'));

app.get('/',  (req, res) => {
    res.sendFile(path.join(__dirname+'/client/dist/index.html'));
  });


app.listen(8080, ()=>{
    console.log("Listening on Port 8080");
});