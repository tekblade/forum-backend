import express from 'express';
import * as fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
import AsyncLock from "async-lock";

var app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var key="";



app.post("/register",function(req,res){
      res.setHeader('Content-Type', 'application/json');
      fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users=JSON.parse(data);
      users["users"].push(req.body);
      var check=false;
      fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(users),'utf8', function (err) {
         if(err){
            res.send(err)
            check=true;
         }
      })
      if(!check){
         res.send("Created"); 
      }
           
   })
})
app.post("/login",function(req,res){   
   fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users=JSON.parse(data);
      var check=false;
      for(let i=0;i<users["users"].length;i++){
         if(users["users"][i]["name"]==req.body["name"] && users["users"][i]["password"]==req.body["password"]){
            res.send("logged");
            check=true;
         }
      }
      if(!check)
      res.send("Acess Denied");
      })
   
           
      
}) 
     

var server = app.listen(8081,function() {
   console.log("server start running");
})

