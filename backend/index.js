const express=require("express")
const cors=require("cors")
const { connection } = require("./configs/connection")
const { TaskRouter } = require("./Routes/task.route")
const { SprintRouter } = require("./Routes/sprint.route")
const app=express()

app.use(cors())
app.use(express.json())
app.use("/task",TaskRouter)
app.use("/sprint",SprintRouter)

app.listen(3001,async()=>{
    try {
        await connection
        console.log("connected")
    } catch (error) {
        console.log(error)
    }
})