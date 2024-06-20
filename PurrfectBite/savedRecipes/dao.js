import model from './model.js';

export const saveRecipe = (saved) => model.create(saved);
export const findSavedByUser = (userId) => model.find({ userId });
export const deleteSaved = (savedId) => model.deleteOne({ _id: savedId });
