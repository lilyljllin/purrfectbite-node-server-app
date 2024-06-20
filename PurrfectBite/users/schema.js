import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String, 
    email: String,
    role: {
        type: String,
        enum: ["USER", "ADMIN", "DIETITION"],
        default: "USER",
    },
    dob: Date,
    biography: String,
    following: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' }], default: []},
},
{collection: "users" }
);
export default userSchema;