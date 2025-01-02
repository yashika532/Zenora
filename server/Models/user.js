import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    // channelName:{
    //     type:String,
    //     required:true,
    // },
    
  userName:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true,
  },
   

  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
  },

  fullName:{
    type:String,
    required:true,
    trim:true,
    index:true,
  },
  password:{
    type:String,
    required:[true,'Password is required'],
  },
    // about:{
    //     type:String,
    //     required:true,
    // },
    // profilePic:{
    //     type:String,
    //     required:true,
    // }
},{timestamps:true})

export const User = mongoose.model("User",userSchema)