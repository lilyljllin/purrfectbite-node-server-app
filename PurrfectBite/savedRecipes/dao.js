import model from './model.js';

export const saveRecipe = (saved) => model.create(saved);
export const findSavedByUser = (userId) => model.find({ userId });
export const deleteSaved = (userId, recipeId) => model.deleteOne({ userId:userId, recipeId:recipeId });
export const existingSaved = (userId, recipeId) => model.findOne({userId:userId, recipeId:recipeId });
export const getMostRecentRecipe = (userId) => model.findOne({userId: userId}).sort({createdAt: -1});
