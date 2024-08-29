const mongoose=require('mongoose')

const connectDB=async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log(`Connected to MongoDB database ${mongoose.connection.host}`.bgCyan.white);
    
  }catch(error){
    console.log(`Mongodb Database error ${error}`.bgRed.white);   
  }
}

module.exports= connectDB