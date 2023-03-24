const express=require("express")
const { SprintModel } = require("../models/sprint.model")
const SprintRouter=express.Router()

SprintRouter.get("/",async(req,res)=>{
    let data=await SprintModel.find()
    res.send(data)
})

SprintRouter.post("/add",async(req,res)=>{
    let data=req.body
    let sprint=new SprintModel(data)
    await sprint.save()
    res.send("Created.")
})

SprintRouter.patch("/:id",async(req,res)=>{
    let id=req.params.id
    let data=req.body
    try {
        await SprintModel.findByIdAndUpdate(id,data)
        res.send("Edited")
    } catch (error) {
        console.log(error)
    }
})

SprintRouter.delete("/:id",async(req,res)=>{
    let id=req.params.id
    try {
        await SprintModel.findByIdAndDelete(id)
        res.send("Deleted.")
    } catch (error) {
        console.log(error)
    }
})

module.exports={
    SprintRouter
}