import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    },
    recipeId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userName: {
        type: String,
    }
},
    { collection: "comments"}
);
export default commentSchema;
