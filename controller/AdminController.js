const userModel=require("../models/userModel")

const getDonarListController=async(req,res)=>{
  try {
    const donarData= await userModel.find({role:'donar'}).sort({createAt:-1})
    return res.status(200).send({
      success:true,
      totalCount:donarData.length,
      message:"Donar List Successfully fetched",
      donarData
    })
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      success:false,
      message:"Error in Getting Donar List "
    })
  }
}

const getHospitalListController=async(req,res)=>{
  try {
    const hospitalData= await userModel.find({role:'hospital'}).sort({createAt:-1})
    return res.status(200).send({
      success:true,
      totalCount:hospitalData.length,
      message:"Donar List Successfully fetched",
      hospitalData
    })
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      success:false,
      message:"Error in Getting Donar List "
    })
  }
}

const getOrganisationListController=async(req,res)=>{
  try {
    const organisationData= await userModel.find({role:'Organisation'}).sort({createAt:-1})
    return res.status(200).send({
      success:true,
      totalCount:organisationData.length,
      message:"Donar List Successfully fetched",
      organisationData
    })
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      success:false,
      message:"Error in Getting Donar List "
    })
  }
}


// Delete Donar Data 
const deleteDonarDataController= async(req,res)=>{
try {
  await userModel.findByIdAndDelete(req.params.id)
  return res.status(200).send({
    success:false,
    message:"Donar successfully Deleted",
  })
} catch (error) {
  console.log(error);
  return res.status(500).send({
    success:false,
    message:"Error in deleting donar ",
    error
  })
}
}
// Delete Donar Data 
const deleteHospitalDataController= async(req,res)=>{
try {
  await userModel.findByIdAndDelete(req.params.id)
  return res.status(200).send({
    success:false,
    message:"Hospital successfully Deleted",
  })
} catch (error) {
  console.log(error);
  return res.status(500).send({
    success:false,
    message:"Error in deleting hospital ",
    error
  })
}
}
// Delete Donar Data 
const deleteOrganisationDataController= async(req,res)=>{
try {
  await userModel.findByIdAndDelete(req.params.id)
  return res.status(200).send({
    success:false,
    message:"Organisation successfully Deleted",
  })
} catch (error) {
  console.log(error);
  return res.status(500).send({
    success:false,
    message:"Error in deleting Organisation ",
    error
  })
}
}

module.exports={getDonarListController,getHospitalListController,getOrganisationListController,deleteDonarDataController,deleteHospitalDataController,deleteOrganisationDataController}