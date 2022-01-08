//requiring basic module
const express = require("express")
const router =  express.Router();

const {newOrder , turnOver , getMaximumTurnOver} = require("../../assingment/controlers/order")


//router to make order 
router.post("/neworder/:wholesalerid/:retailerid" , newOrder);


//router to get total monthly turnover of each wholesaler for a complete year
router.get("/turnover/:wholesalerid" ,  turnOver )


//for getting maximum turnover from a single retailer
router.get("/getmaximumturnover" , getMaximumTurnOver)


module.exports = router


