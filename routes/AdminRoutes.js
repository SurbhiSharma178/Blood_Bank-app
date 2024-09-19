const express= require("express");
const authMiddleWare = require("../middlewares/authMiddleWare");
const { getDonarListController, getHospitalListController, getOrganisationListController, deleteDonarDataController, deleteHospitalDataController } = require("../controller/AdminController");
const AdminMiddleWare = require("../middlewares/AdminMiddleWare");

// Routes
const router=express.Router()

// GET Donar List
router.get("/donar-List",authMiddleWare,AdminMiddleWare,getDonarListController)

// GET Hospital List
router.get("/hospital-List",authMiddleWare,AdminMiddleWare,getHospitalListController)

// GET Organisation List
router.get("/organisation-List",authMiddleWare,AdminMiddleWare,getOrganisationListController)


// Delete Donar List
router.delete("/delete-donar/:id",authMiddleWare,AdminMiddleWare,deleteDonarDataController)

// Delete Hospital List
router.get("/delete-hospital/:id",authMiddleWare,AdminMiddleWare,deleteHospitalDataController)

// Delete Organisation List
router.get("/delete-organisation/:id",authMiddleWare,AdminMiddleWare,deleteDonarDataController)

module.exports=router