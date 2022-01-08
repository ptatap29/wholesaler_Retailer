//Require Modules
var mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

//Making Schema
const retailerschema = new mongoose.Schema({
    name: {
        type : String
    },
    phone_number:{
        type : Number
         
        
    },
    wholesalerId:{
        type : Array
    }

},{timestamps:true})






//Making Auto Increment
autoIncrement.initialize(mongoose.connection);
retailerschema.plugin(autoIncrement.plugin ,{
    model:"retailerschema",
    startedAt:1,
    increasedBy:1
})

//Exporting Schema
var retailer = mongoose.model('retailer' , retailerschema)

module.exports = {retailer}
