 const TestController=(req,res)=>{
  res.status(200).send({
    message:"Welcome Router",
    success:"true"
  })
}

module.exports={TestController}