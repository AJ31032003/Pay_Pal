const express=require("express")
const cors=require("cors")
const { connection } = require("./configs/connection")
const app=express()

app.use(cors())
app.use(express.json())

app.listen(3001,async()=>{
    try {
        await connection
        console.log("connected")
    } catch (error) {
        console.log(error)
    }
})