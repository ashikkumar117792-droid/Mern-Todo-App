const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const Todo = require('./models/Todo');

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("MongoDB connected Successfully");
})
.catch((error)=> {
    console.log(error);
})


app.get("/todos", async (req,res)=> {
    try{    
        const todos = await Todo.find();
        res.json(todos);
    }catch(error){
        res.status(500).json({message: "Internal Server Error"});
    }
});

app.post("/todos", async(req,res)=>{
    try {
        const title = req.body.title;
        if(!title || !title.trim()){
            return res.status(400).json({message: "Title is required"});
        }
        const newTodo = await Todo.create({title: title});
        res.status(201).json(newTodo);

    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server error"});
    }
});

app.put("/todos/:id", async (req,res)=> {
   try {
    const id = req.params.id;
    const { title } = req.body;
    if(!title || !title.trim()){
        return res.status(400).json({message: "Title is required"});
    }
    const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        {title: title},
        {new: true}
    )
    if(!updatedTodo){
        return res.status(404).json({ message: "Todo not found "});
    }
    res.json(updatedTodo);
    }catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }

});

app.put("/todos/:id/complete", async (req,res)=> {
    const { completed } = req.body;
    const id = req.params.id;
    try{
        const updatedTodo = await Todo.findByIdAndUpdate(id, {completed: completed}, {new: true});

        if(!updatedTodo){
            return res.status(404).json({Messsage: "Todo not found "});
        }
        res.json(updatedTodo);
    }catch(error){
        res.status(404).json({message: "Internal Server Error"});
    }
})

app.delete("/todos/:id", async(req,res)=>{
    try{
        const id = req.params.id;
        const deleteTodo = await Todo.findByIdAndDelete(id);
        if(!deleteTodo){
            return res.status(404).json({message: "Todo not found"});
        }
        res.send(deleteTodo);
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

app.listen("5000",()=>{
    console.log("server running on port 5000");
})
