const userModel = require("../models/userModel");
const Inventory =require("../models/InventoryModel")

// Create Inventory function
const createInventoryController=async(req,res)=>{
  try {
    // validation
    const {email,inventoryType}=req.body
    const user=await userModel.findOne({email})
    if(!user){
       throw  new Error('user not found')
    }
    if(inventoryType==="in" && user.role !=='donar'){
       throw new Error("Not a donar account");
    }
    if(inventoryType==='out' && user.role !=='hospital'){
      throw new Error('Not a hospital')
    }

    // save record
    const inventory= new Inventory(req.body)
    await inventory.save()
    return res.status(200).send({
      success:true,
      message:"New record added"
    })
  } catch (error) {
    console.log("Error:"+error.message);
    return res.status(500).send({
      success:false,
      message:"Error in creating Inventory",
      error
    })
    
  }
}

// Get all blood record
const getInventoryController = async(req,res)=>{
  try {
    const inventory = await Inventory.findOne({Orgnisation:req.body.userId}).populate('donar').populate('hospital').sort({createdAt:-1})
    // console.log(inventory);
    
    return res.status(200).send({
      success:true,
      message:'GET all records successfully',
      inventory,
    })
  } catch (error) {
    console.log("Error:"+error.message);
    return res.status(500).send({
      success:false,
      message:"Error in geting all inventories",
      error
    })
    
  }
}
module.exports={createInventoryController,getInventoryController}