const express=require("express")
const { TaskModel } = require("../models/task.model")
const TaskRouter=express.Router()

TaskRouter.get("/:id",async(req,res)=>{
    let id=req.params.id
    let data=await TaskModel.find({sprintId:id})
    res.send(data)
})

TaskRouter.post("/add",async(req,res)=>{
    let data=req.body
    let task= new TaskModel(data)
    await task.save()
    res.send("Added")
})

TaskRouter.patch("/:id",async(req,res)=>{
    let data=req.body
    let id=req.params.id
    try {
        await TaskModel.findByIdAndUpdate(id,data)
        res.send("Updated")
    } catch (error) {
        console.log(error)
    }
})

TaskRouter.delete("/:id",async(req,res)=>{
    let id=req.params.id
    try {
        await TaskModel.findByIdAndDelete(id)
        res.send("Deleted.")
    } catch (error) {
        console.log(error)
    }
})

module.exports={
    TaskRouter
}