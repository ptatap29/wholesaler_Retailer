//Requiring basic module
const express = require("express")
const router =  express.Router();

const {createRetailer , getRetailerOne} = require("../../assingment/controlers/retailer")


//router for creating retailer
router.post("/createretailer" , createRetailer);

//router to Get a retailer who has single wholesaler
router.get("/getretailerone" , getRetailerOne)


module.exports = router


