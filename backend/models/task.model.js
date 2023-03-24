const mongoose=require("mongoose")
const taskSchema=mongoose.Schema({
    title:String,
    status:String,
    assignee:String,
    sprintId: mongoose.Types.ObjectId
},{
    versionKey:false
})

const TaskModel=mongoose.model("task",taskSchema)

module.exports={
    TaskModel
}