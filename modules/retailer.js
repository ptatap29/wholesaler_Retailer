const express = require("express")
const {retailer} = require("../../assingment/modules/retailer")
const {wholesaler} = require("../../assingment/modules/wholesaler")

//for creating retailer
exports.createRetailer = async (req , res)=>{

    try{
        var newretailer = new retailer(req.body)
        var response = await newretailer.save()



        return res.status(200).json({
            "isSucess":true, 
            "message":"successfull request",
            "data":response,
            "status":200
         })

    }catch(err){

        console.log(err)
        return res.status(500).json({
              "isSuccess": false,
              "message":"internal error server",
              "data": {},
              "status": 500
        })

    }
}


//for getting the retailer having only one wholesaler
exports.getRetailerOne  = async (req , res)=>{

    

    try{
        
        var resultArray =[]
        var allretailer  = await retailer.find()

        for(var i = 0 ; i < allretailer.length ; i++ ){

            if(allretailer[i].wholesalerId.length == 1){
                resultArray.push(allretailer[i])
            }else{
                continue;
            }
        }


        return res.status(200).json({
            "isSucess":true, 
            "message":"successfull request",
            "data":resultArray,
            "status":200
         })

    }catch(err){

        
        console.log(err)
        return res.status(500).json({
              "isSuccess": false,
              "message":"internal error server",
              "data": {
                
              },
              "status": 500
        })


    }
}