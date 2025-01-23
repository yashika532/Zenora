import mongoose from "mongoose";

const subscribeSchema = new mongoose.Schema({
   subscriber: { // The user who is subscribing
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    channel: { // The user being subscribed to
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export const Subscribe = mongoose.model('subscribe', subscribeSchema);
