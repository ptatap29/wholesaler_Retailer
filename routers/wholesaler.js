//requiring basic module
const express = require("express")
const router =  express.Router();

const {createWholeSaler , getRetailer} = require("../../assingment/controlers/wholesaler")


//Router to create wholesaler
router.post("/createwholesaler" , createWholeSaler);

//Router to get  wholesaler along with a list of retailers associated.
router.get("/getretailer/:id" , getRetailer)


module.exports = router


