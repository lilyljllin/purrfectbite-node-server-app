import model from "./model.js";

export const findAllArticles = () => model.find().populate('author', 'firstName lastName');
export const createArticle = (article) => model.create(article);
export const findArticleByAuthor = (userId) =>  model.find({author: userId});
export const findArticleById = (articleId) => model.findById(articleId);
export const updateArticle = async(articleId, article) => {
    const updatedArticle = await model.findOneAndUpdate({ _id: articleId } , { $set: article });
        return updatedArticle;
};
export const deleteArticle = (articleId) => model.deleteOne({ _id: articleId });
export const findAuthorById = (articleId) => model.findById(articleId).populate("author");
export const searchArticles = (search) => {
    const regex = new RegExp(search, "i");
    return model.find({$or: [{title: { $regex: regex }}, { content: { $regex: regex }}]}).populate('author', 'firstName lastName');
}
export const deleteArticlesByAuthor = (userId) => model.deleteMany({author: userId});

