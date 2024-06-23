import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("ArticleModel", schema);
export default model;