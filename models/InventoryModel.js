const mongoose= require('mongoose')

const inventorySchema= new mongoose.Schema({
  inventoryType:{
    type:String,
    required:[true,'inventory type requires'],
    enum:['in',"out"],
  },
  bloodGroup:{
    type:String,
    required:[true,'blood group is required'],
    enum:['O+','O-','AB+','AB-','B+','B-','A+','A-']
  },
  quantity:{
    type:Number,
    required:[true,'blood quantity is required']
  },
  Organisation:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users',
    required:[true,'Orgnisation is required']
  },
  hospital:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users',
    required:function(){
      return this.inventoryType==="out"
    }

  },
  donar:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users',
    required:function(){    
      return this.inventoryType==="in"}
  }
},{timpstamps:true})

module.exports=mongoose.model('Inventory',inventorySchema)