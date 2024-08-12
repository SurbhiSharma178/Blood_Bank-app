const express= require('express');

// rest object
const app= express();

// Route
// 1test
app.get('/',(req,res)=>{
  res.status(200).json({
    message:'Welcome to Blood bank app'
  })
})

// port 
const PORT= 8080

// listen
app.listen(PORT,()=>{
  console.log("Server is running on port no" , PORT)
})