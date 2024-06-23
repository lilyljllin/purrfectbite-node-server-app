import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    title: {
        type: String,
        required: true,
        default: "",
    },
    content: {
        type: String,
        required: true,
        default: ""
    },
    
}, {
    collection: 'articles',
    timestamps: true
});

export default articleSchema;
