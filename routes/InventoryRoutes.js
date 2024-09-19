const express= require('express');
const authMiddleWare = require('../middlewares/authMiddleWare');
const { createInventoryController ,getInventoryController, getDonarController,getHospitalController, getOrganisationController, getOrganisationForHospitalController, getInventoryHospitalController, getRecentInventoryController} = require('../controller/InventoryController');
const router= express.Router();

// router
// Add Inventory ||POST
router.post('/create-inventory',authMiddleWare,createInventoryController)

// Get all blood record ||GET
router.get('/get-inventory',authMiddleWare,getInventoryController)

// Get Recent blood record ||GET
router.get('/get-recentInventory',authMiddleWare,getRecentInventoryController)

// GET hospital consumer record
router.post('/get-inventory-hospital',authMiddleWare,getInventoryHospitalController)

// Get Donar Records
router.get('/get-donars',authMiddleWare,getDonarController)

// Get Hospital Records
router.get('/get-hospital',authMiddleWare,getHospitalController)

// Get Organisation Records
router.get('/get-organisation',authMiddleWare,getOrganisationController)

// Get Organisation for hospital Records
router.get('/get-organisation-for-hospital',authMiddleWare,getOrganisationForHospitalController)
module.exports=router