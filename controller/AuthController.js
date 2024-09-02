const userModel=require('../models/userModel')
const bcrypt=require('bcryptjs');
const jwt= require("jsonwebtoken")

// registration
const registerController=async(req,res)=>{
try {
  const existingUser=await userModel.findOne({email:req.body.email})

  // validation
  if(existingUser){
    return res.status(200).send({
      success:false,
      message:"USer already exist"
    })
  }
  const salt=await bcrypt.genSalt(10) 
  const hashedPassword= await bcrypt.hash(req.body.password,salt);
  // console.log(hashedPassword);
  req.body.password=hashedPassword

  // rest data
  const user= new userModel(req.body)
  await user.save()
  return res.status(201).send({
    success:true,
    message:"User successfully registered",
    user
  })

} catch (error) {
  console.log("Error: "+error.message);
  res.status(500).send({
    success:false,
    message:"Error in Register API",
    error
  })
  
}
}

// login
const loginController=async(req,res)=>{
  try {
    const User =await userModel.findOne({email:req.body.email});

    if(!User){
      return res.status(404).send({
        success:false,
        message:"User not found"
      })
    }

    // role
    if(User.role !== req.body.role){
      return res.status(500).send({
        success:false,
        message:"Role doesn't match"
      })
    }
    // compring password
    const comparePassword= await bcrypt.compare(req.body.password,User.password)
    if(!comparePassword){
      return res.status(500).send({
        success:false,
        message:"Incorrect Password"
      })
    }
    
    const token = jwt.sign({userID:User._id},process.env.JWT_SECRET,{expiresIn:'1h'})
    return res.status(201).send({
      success:true,
      message:"USer successfully login",
      token,
      User
    })
  } catch (error) {
    console.log("Error:"+ error.message);
    res.status(500).send({
      success:false,
      message:"Error in login API",
      error
    })
    
  }
}


// get current user

const currentUserController=async(req,res)=>{
  try {
    const currentUser= await userModel.findOne({_id:req.body.userId})
    return res.status(200).send({
      success:true,
      message:"User Fetched successfully",
      currentUser
    })
  } catch (error) {
    console.log("Error:"+error.message);
    return res.status(500).send({
      success:false,
      message:"Unable to get current user",
      error
    })
    
  }
}

module.exports={registerController,loginController,currentUserController}