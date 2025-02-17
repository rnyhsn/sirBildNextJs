import mongoose from "mongoose";


const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true 
    },
    phone: {
        type: String 
    },
    designation: {
        type: String,
        required: true 
    },
    image: {
        type: String 
    },
    academy: {
        type: String,
        required: true 
    },
    location: {
        type: String
    },
    role: {
        type: String,
        enum: ['reviewer', 'editor'],
        default: 'reviewer'
    },

}, {timestamps: true});


export const Member = mongoose.models?.Member || mongoose.model('Member', memberSchema);