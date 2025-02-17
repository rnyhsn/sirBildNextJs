import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true 
    },
    slug: {
        type: String,
        required: true 
    },
    content: {
        type: String
    },
    featuredImg: {
        type: String 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});


export const Post = mongoose.models?.Post || mongoose.model('Post', postSchema);