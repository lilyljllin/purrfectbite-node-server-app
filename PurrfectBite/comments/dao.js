import model from "./model.js";
export const createComment = (comment) => {
    return model.create(comment);
};
export const findAllComments = () => model.find();
export const findCommentById = (commentId) => model.findById(commentId);
export const findCommentsByRecipe = (recipeId) => model.find({recipeId});
export const findCommentsByUser = (userId) => model.find({userId});
export const editComment = (commentId, comment) => model.updateOne({_id: commentId}, {$set: comment});
export const deleteComment = (commentId) => model.deleteOne({_id: commentId});