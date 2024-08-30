const jwt=require('jsonwebtoken')

module.exports= async(req,res,next)=>{
  try {
    const token=req.headers['authorization'].split(" ")[1]
    jwt.verify(token,process.env.JWT_SECRET,(error,decode)=>{
      if(error){
        return res.status(401).send({
          success:false,
          message:"Authentication failed"
        })
      }else{
       req.body.userID=decode.userID;
        next();
      }
    })
    
  } catch (error) {
    console.log("Error:"+error.message);
    return res.status( 401).send({
      success:false,
      error,
      message:"Auth failed"
    })
    
  }
}