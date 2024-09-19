const express=require('express');
const authMiddleWare=require("../middlewares/authMiddleWare");
const { bloodGroupDetailsController } = require('../controller/AnalyticsController');

const router=express.Router();

router.get('/bloodGroup-data',authMiddleWare,bloodGroupDetailsController)



module.exports=router;
