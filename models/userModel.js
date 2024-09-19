const mongoose= require('mongoose')


const UserSchema=new mongoose.Schema({
  role:{
    type:String,
    required:[true, "role is required"],
    email:['Admin','Organisation','donar','hospital']
  },
  name:{
    type:String,
    required:function(){
      if((this.role==='donar')|| (this.role==='Admin')){
       return true}
      return false
    }
  },
  OrganisationName:{
    type:String,
    required:function(){
      if(this.role==='Organisation'){
        return true
      }
      return false
    }
  },
  hospitalName:{
    type:String,
    required:function(){
      if(this.role==='hospital'){
        return true
      }
      return false
    }
  },
  email:{
    type:String,
    required:[true,"email is required"],
    unique:true
  },
  password:{
    type:String,
    required:[true,"password is required"]
  },
  website:{
    type:String
  },
  address:{
    type:String,
    required:[true,"address is required"]
  },
  phone:{
    type:Number,
    required:[true,"Mobile no is required"]
  }
},
{timestamps:true}
)

module.exports=mongoose.model('users',UserSchema)