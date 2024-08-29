const express= require('express')
const  {TestController}  = require('../controller/TestController')

// router object
 const router= express.Router()

//  routes

router.get('/',TestController);

// export
module.exports=router;