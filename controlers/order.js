const express = require("express");
const { order } = require("../../assingment/modules/order");
const { retailer } = require("../modules/retailer");
const { wholesaler } = require("../../assingment/modules/wholesaler");
const moment = require("moment");

//for makking order
exports.newOrder = async (req, res) => {
  var wholesalerid = req.params.wholesalerid;
  var retailerid = req.params.retailerid;

  try {
    var neworder = new order(req.body);
    neworder.wholesalerId = wholesalerid;
    neworder.retailerId = retailerid;

    var wholesalerDetail = await wholesaler.findOne({ _id: wholesalerid });

    if (wholesalerDetail.retailerId.includes(retailerid) == true) {
      console.log("order placed");
    } else {
      var updateWholesaler = await wholesaler.findOneAndUpdate(
        { _id: wholesalerid },
        req.body,
        {
          new: true,
        }
      );

      updateWholesaler.retailerId.push(retailerid);

      var updateRId = updateWholesaler.save();
    }

    var retailerdetail = await retailer.findOne({ _id: retailerid });

    if (retailerdetail.wholesalerId.includes(wholesalerid) == true) {
      console.log(retailerdetail, "thanx for odering");
    } else {
      var updateRetailer = await retailer.findOneAndUpdate(
        { _id: retailerid },
        req.body,
        {
          new: true,
        }
      );
      //  console.log(updateRetailer)
      updateRetailer.wholesalerId.push(wholesalerid);

      var updateWId = updateRetailer.save();
    }

    var response = await neworder.save();

    return res.status(200).json({
      isSucess: true,
      message: "successfull request",
      data: {
        response,
      },
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      isSuccess: false,
      message: "internal error server",
      data: {},
      status: 500,
    });
  }
};

//for getting total monthly turnover of each wholesaler for a complete year.
exports.turnOver = async (req, res) => {
  var wholesalerid = req.params.wholesalerid;

  try {
    var totalTurnOver = [];
    //  var TurnOver = { };
    var response = await wholesaler.find();
    for (var i = 0; i < response.length; i++) {
      var TurnOver = {};

      var particularorder = await order.find({ wholesalerId: response[i]._id });

      var janturnover =
        (febturnover =
        marchturnover =
        aprilturnover =
        mayturnover =
        junturnover =
        julyturnover =
        augturnover =
        septurnover =
        octturnover =
        novturnover =
        decturnover =
          0);

      for (var j = 0; j < particularorder.length; j++) {
        if (moment(particularorder[j].date, "DD/MM/YYYY").format("MM") == 01) {
          var janturnover = janturnover + particularorder[j].stockAmount;
        } else if (
          moment(particularorder[j].date, "DD/MM/YYYY").format("MM") == 02
        ) {
          var febturnover = febturnover + particularorder[j].stockAmount;
        } else if (
          moment(particularorder[j].date, "DD/MM/YYYY").format("MM") == 03
        ) {
          var marchturnover = marchturnover + particularorder[j].stockAmount;
        } else if (
          moment(particularorder[j].date, "DD/MM/YYYY").format("MM") == 04
        ) {
          var aprilturnover = aprilturnover + particularorder[j].stockAmount;
        } else if (
          moment(particularorder[j].date, "DD/MM/YYYY").format("MM") == 05
        ) {
          var mayturnover = mayturnover + particularorder[j].stockAmount;
        } else if (
          moment(particularorder[j].date, "DD/MM/YYYY").format("MM") == 06
        ) {
          var junturnover = junturnover + particularorder[j].stockAmount;
        } else if (
          moment(particularorder[j].date, "DD/MM/YYYY").format("MM") == 07
        ) {
          var julyturnover = julyturnover + particularorder[j].stockAmount;
        } else if (
          moment(particularorder[j].date, "DD/MM/YYYY").format("MM") == 08
        ) {
          var augturnover = augturnover + particularorder[j].stockAmount;
        } else if (
          moment(particularorder[j].date, "DD/MM/YYYY").format("MM") == 09
        ) {
          var septurnover = septurnover + particularorder[j].stockAmount;
        } else if (
          moment(particularorder[j].date, "DD/MM/YYYY").format("MM") == 10
        ) {
          var octturnover = octturnover + particularorder[j].stockAmount;
          //  totalTurnover.push(response[i].octturnover)

          //
        } else if (
          moment(particularorder[j].date, "DD/MM/YYYY").format("MM") == 11
        ) {
          var novturnover = novturnover + particularorder[j].stockAmount;
        } else if (
          moment(particularorder[j].date, "DD/MM/YYYY").format("MM") == 12
        ) {
          var decturnover = decturnover + particularorder[j].stockAmount;
        }
      }

      TurnOver.January = janturnover;
      TurnOver.February = febturnover;
      TurnOver.March = marchturnover;
      TurnOver.April = aprilturnover;
      TurnOver.May = mayturnover;
      TurnOver.June = junturnover;
      TurnOver.July = julyturnover;
      TurnOver.August = augturnover;
      TurnOver.September = septurnover;
      TurnOver.October = octturnover;
      TurnOver.November = novturnover;
      TurnOver.December = decturnover;

      totalTurnOver.push(response[i], TurnOver);
    }

    return res.status(200).json({
      isSucess: true,
      message: "successfull request",
      data: {
        totalTurnOver,
      },
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      isSuccess: false,
      message: "internal error server",
      data: {},
      status: 500,
    });
  }
};



//for getting Max turnover of each wholesaler from a single retailer
exports.getMaximumTurnOver = async (req, res) => {
  try {
    var obj = [];
    var sum = 0;
    var allwholesaler = await wholesaler.find();

    for (var i = 0; i < allwholesaler.length; i++) {
      var a = [];
      var maxTurnover = {};
      var allretailer = await wholesaler.findById(allwholesaler[i]._id);
      // console.log()

      for (var j = 0; j < allretailer.retailerId.length; j++) {
        var rid = await retailer.findById(allretailer.retailerId[j]);
        a.push(rid);
        //  console.log(rid)

        var text = await order.find({
          wholesalerId: allwholesaler[i]._id,
          retailerId: allretailer.retailerId[j],
        });
        console.log(text.length, i, j, "popopopo");
      }
    }

    return res.status(200).json({
      isSucess: true,
      message: "successfull request",
      data: {
        allwholesaler,
      },
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      isSuccess: false,
      message: "internal error server",
      data: {},
      status: 500,
    });
  }
};
