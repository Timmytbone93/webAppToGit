var express = require('express');
var config  = require('../Config/config');

var User = require('../models/User');
var Bar = require('../models/Bar');

var router = express.Router();


router.post('/Add',function(req,res,next){
    var newBar = {
        BarName:req.body.BarName,
        BarOwnerID: req.body.BarOwnerID,
        Address:req.body.address
    };
    Bar.save(newBar);
});


module.exports = router;