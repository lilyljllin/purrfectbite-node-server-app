import mongoose from 'mongoose';

const savedSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    recipeId: {
        type: String,
        required: true
    },
    note: String,
}, {
    collection: 'savedRecipes'
});

export default savedSchema;
