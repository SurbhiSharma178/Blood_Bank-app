const InventoryModel = require("../models/InventoryModel");
const mongoose = require('mongoose')

const bloodGroupDetailsController=async(req,res)=>{
  try {
    const bloodGroups=['O+','O-','AB+','AB-','B+','B-','A+','A-'];
    const bloodGroupData=[]    
    const Organisation =new mongoose.Types.ObjectId(req.body.userID);
    // console.log(Organisation);
    

    // GET Single Blood Group
    await Promise.all(
      bloodGroups.map(async(bloodGroup)=>{
        // console.log(`processing blood group :${bloodGroup}`);
        
        // Count Total In
        const totalIn=await InventoryModel.aggregate([
          {
            $match:{
              bloodGroup:bloodGroup,
              inventoryType:'in',
              Organisation:Organisation
            },
          },
          {
            $group:{
              _id:null,
              total:{$sum:"$quantity"}
            },
          },
        ]);
        // console.log(`Total In for ${bloodGroup}: `, totalIn);

        // Count total Out
        const totalOut= await InventoryModel.aggregate([
          {
          $match : {
            bloodGroup:bloodGroup,
            inventoryType:'out',
            Organisation:Organisation
          },
        },
          {
            $group:{
              _id:null,
              total:{$sum:"$quantity"}
            }
          }
        ])
        // console.log(`Total Out for ${bloodGroup}: `, totalOut);


        // const available Blood
        const availableBlood=(totalIn[0]?.total || 0)-(totalOut[0]?.total ||0)
        // Push Data
        bloodGroupData.push({
          bloodGroup,
          totalIn:totalIn.length > 0 && totalIn[0]?.total ? totalIn[0].total : 0,
          totalOut:totalOut.length > 0 && totalOut[0]?.total ? totalOut[0].total : 0,
          availableBlood
        })
      })
    )
    
    return res.status(200).send({
      success:true,
      message:"Blood Group Data Successfully Fetched",
      bloodGroupData
    })
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      success:false,
      message:"Error in Blood Group Data Anayltics API",
      error
    })
  }

}
module.exports={bloodGroupDetailsController}