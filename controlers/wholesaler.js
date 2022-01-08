const express = require("express")
const {wholesaler} = require("../../assingment/modules/wholesaler")
const { retailer } = require("../modules/retailer")

//for creating wholesaler
exports.createWholeSaler = async (req , res)=>{

    try{
        var newwholesaler = new wholesaler(req.body)
        var response = await newwholesaler.save()



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
              "data": {
                
              },
              "status": 500
        })

    }
}


//for getting all the retailer associated with wholesaler
exports.getRetailer  = async (req , res)=>{

    var id = req.params.id

    try{
        
        var a =[]
      
        var allretailer  = await wholesaler.findById(id)
        

        for(var i = 0 ; i<allretailer.retailerId.length ; i++){

            var rid = await retailer.findById(allretailer.retailerId[i])
            a.push(rid)
            

        }


        return res.status(200).json({
            "isSucess":true, 
            "message":"successfull request",
            "data":a,
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



