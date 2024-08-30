const express=require('express');
const {registerController,loginController,currentUserController} = require('../controller/AuthController');
const authMiddleWare = require('../middlewares/authMiddleWare');
const router=express.Router();

// routes
// Register|| POST
router.post('/register',registerController)

// Login || POST
router.post('/login',loginController)

// get Current User || GET\
router.get('/current-user',authMiddleWare,currentUserController)


module.exports=router