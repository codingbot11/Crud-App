const mongoose = require("mongoose");
const EmployeeSchema=mongoose.Schema({
    fname:{type:String},
    lname:{type:String},
    email:{type:String},
    password:{type:String}
})
module.exports = mongoose.model("employee",EmployeeSchema);