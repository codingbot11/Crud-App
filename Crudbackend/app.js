const express = require('express');
const app = express();
const cors= require('cors');
app.use(cors());
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const EmployeeModel=require('./employee.js')
mongoose.connect("mongodb://localhost:27017/API");

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json())
//send data from server to client
app.get("/",(req,res)=>{
    res.send("This is first API");
})
//data send from client to server

app.post("/create", async(req,res)=>{
try{
const data= new EmployeeModel(req.body);
await data.save();
res.status(200).send(data)
}catch(err){
    console.log(err);
}
})
app.get("/list",async(req,res)=>{
try{
  const data = await EmployeeModel.find();
  res.send(data);

}catch(err){
    console.log(err);
}
})
app.get("/list/:id",async(req,res)=>{
    try{
        const data1 = await EmployeeModel.findById(req.params.id);
        res.send(data1);
    }
    catch(err){
        console.log("err");
    }
})

app.delete("/delete/:id",async(req,res)=>{
    try{
        const del= await EmployeeModel.findByIdAndDelete(req.params.id);
        res.send("Data is Deleted");
    }
    catch(err){
        console.log("err");
    }
}) 

app.put("/list/:id",async(req,res)=>{
    try{
        const emp = await EmployeeModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.send(emp);

    }
    catch(err){
        res.status(404).send({messsage:"Employee not Found"})
    }
})

app.listen(5002);
console.log("Server is Running");
