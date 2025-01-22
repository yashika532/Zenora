import mongoose from "mongoose";

const subscribeSchema = new mongoose.Schema({
   user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'video', 
        required: true
    },
  subscribedAt:{
    type:Date,
    default:Date.now
  }
},{timestamps:true});

export const Subscribe = mongoose.model('subcribe',subscribeSchema);