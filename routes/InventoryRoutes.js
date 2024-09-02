const express= require('express');
const authMiddleWare = require('../middlewares/authMiddleWare');
const { createInventoryController ,getInventoryController} = require('../controller/InventoryController');
const router= express.Router();

// router
// Add Inventory ||POST
router.post('/create-inventory',authMiddleWare,createInventoryController)

// Get all blood record ||GET
router.get('/get-inventory',authMiddleWare,getInventoryController)


module.exports=router