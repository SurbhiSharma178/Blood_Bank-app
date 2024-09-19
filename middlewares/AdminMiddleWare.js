const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const User = await userModel.findById(req.body.userID)

    // check admin
    if (User.role !== "Admin") {
      return res.status(401).send({
        success: false,
        message: "Role does not match"
      })
    } else {
      next()
    }
  } catch (error) {
    console.log(error.message);
    return res.status(401).send({
      success: false,
      message: "Error in create Admin middleware",
      error
    })
  }
}