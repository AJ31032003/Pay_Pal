const mongoose=require("mongoose")
const SprintSchema = mongoose.Schema({
    name: String
  }, {
    versionKey: false
  });
  

const SprintModel=mongoose.model("sprint",SprintSchema)

module.exports={
    SprintModel
}

