const mongoose = require('mongoose')
const userModel = require("../models/userModel");
const InventoryModel = require("../models/InventoryModel")

// Create Inventory function
const createInventoryController = async (req, res) => {
  try {
    // validation
    const { email } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
      throw new Error('user not found')
    }
    // if(inventoryType==="in" && user.role !=='donar'){
    //    throw new Error("Not a donar account");
    // }
    // if(inventoryType==='out' && user.role !=='hospital'){
    //   throw new Error('Not a hospital')
    // }

    if (req.body.inventoryType === 'out') {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedBloodQuantity = req.body.quantity;
      const Organisation = new mongoose.Types.ObjectId(req.body.userID)

      // calculate IN blood quantity
      const totalInBloodQuantity = await InventoryModel.aggregate([
        {
          $match: {
            Organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup
          }
        }, {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: '$quantity' }
          }
        }
      ])
      // console.log("Total In" ,totalInBloodQuantity); 

      const totalIn = totalInBloodQuantity[0]?.total || 0

      // calculate Out blood quantity
      const totalOutOfRequestedBloodQuantity = await InventoryModel.aggregate([
        {
          $match: {
            Organisation,
            inventoryType: 'out',
            bloodGroup: requestedBloodGroup
          }
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: '$quantity' }
          }
        }
      ])
      const totalOut = totalOutOfRequestedBloodQuantity[0]?.total || 0


      // In & Out Calculation
      const availableQuantityOfBloodGroup = totalIn - totalOut

      // Quantity validation 
      if (availableQuantityOfBloodGroup < requestedBloodQuantity) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuantityOfBloodGroup} (ML) of ${requestedBloodGroup.toUpperCase()} is available`
        })
      }
      req.body.hospital = user?._id
    } else {
      req.body.donar = user?._id
    }


    // save record
    const inventory = new InventoryModel(req.body)
    await inventory.save()
    return res.status(201).send({
      success: true,
      message: "New record added"
    })
  } catch (error) {
    console.log("Error:" + error.message);
    return res.status(500).send({
      success: false,
      message: "Error in creating Inventory",
      error
    })

  }
}

// Get all blood record
const getInventoryController = async (req, res) => {
  try {
    const inventory = await InventoryModel.find({ Orgnisation: req.body.userId }).populate('donar').populate('hospital').sort({ createdAt: -1 })
    // console.log(inventory);

    return res.status(200).send({
      success: true,
      message: 'GET all records successfully',
      inventory,
    })
  } catch (error) {
    console.log("Error:" + error.message);
    return res.status(500).send({
      success: false,
      message: "Error in geting all inventories",
      error
    })

  }
}

// GET Hospital Blood Record
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await InventoryModel.find(req.body.filters).populate('donar').populate('hospital').populate("Organisation").sort({ createdAt: -1 })
    // console.log(inventory);

    return res.status(200).send({
      success: true,
      message: 'GET Hospital consumer records successfully',
      inventory
    })
  } catch (error) {
    console.log("Error:" + error.message);
    return res.status(500).send({
      success: false,
      message: "Error in geting hospital consumer inventories",
      error
    })

  }
}


// GET Donar Record
const getDonarController = async (req, res) => {
  try {
    const Organisation = req.body.userID
    // find donar
    const donarId = await InventoryModel.distinct("donar", {
      Organisation
    });
    // console.log(donarId);
    const donars = await userModel.find({ _id: { $in: donarId } })
    return res.status(200).send({
      success: true,
      message: 'Donar Record Fetched Successfully',
      donars,
    })

  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      success: false,
      message: 'Error in Donar Records',
      error
    })

  }
}


// Get Hospital Record
const getHospitalController = async (req, res) => {
  try {
    const Organisation = req.body.userID
    // find hospital
    const hospitalId = await InventoryModel.distinct("hospital", {
      Organisation
    })
    const hospital = await userModel.find({ _id: { $in: hospitalId } })
    return res.status(200).send({
      success: true,
      message: "Hospital Records Successfully fetched",
      hospital
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).send({
      success: false,
      message: "Error in getting Hospital Records",
      error
    })
  }
}

const getOrganisationController = async (req, res) => {
  try {
    const Organisation = req.body.userID;
    // find orginastion
    const OrganisationId = await InventoryModel.distinct('Organisation', { Organisation });
    // console.log(Organisation);

    const organisation = await userModel.find({ _id: { $in: OrganisationId } })
    // console.log(organisation);

    res.status(200).send({
      success: true,
      message: "Organstion Records successfully fetched",
      organisation
    })
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      success: false,
      message: "Error in getting Organisation Records",
      error
    })
  }
}


// Get Organisation for hospital Record
const getOrganisationForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userID
    // find hospital
    const hospitalId = await InventoryModel.distinct("hospital", {
      hospital
    })
    const organisations = await userModel.find({ _id: { $in: hospitalId } })
    return res.status(200).send({
      success: true,
      message: "Organisation For Hospital Records Successfully fetched",
      organisations
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).send({
      success: false,
      message: "Error in getting Organisation for Hospital Records",
      error
    })
  }
}
module.exports = { createInventoryController, getInventoryController, getDonarController, getHospitalController, getOrganisationController,getOrganisationForHospitalController,getInventoryHospitalController }