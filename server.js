const express= require('express');
const dotenv=require('dotenv')
const colors= require('colors');
const morgan= require('morgan');
// const mongoose= require('mongoose');
const cors= require('cors');
const connectDB = require('./config/db');

// dot config
dotenv.config();

// mongoodb connection
connectDB();

// rest object
const app= express();

// middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


// Route
// 1test
app.use('/api/v1/test',require('./routes/testRoutes'));

// port 
const PORT= process.env.PORT || 8080

// listen
app.listen(PORT,()=>{
  console.log(`Node Server Running in ${process.env.DEV_MODE} Mode On Port ${process.env.PORT}`.bgBlue.white)
})