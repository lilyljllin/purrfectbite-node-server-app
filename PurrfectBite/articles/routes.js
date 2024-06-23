import * as dao from "./dao.js";

export default function ArticleRoutes(app) {
    const createArticle = async(req, res) => {
        const article = await dao.createArticle(req.body); // passing article as a parameter
        res.json(article);
    };
    const deleteArticle = async(req, res) => {
        const status = await dao.deleteArticle(req.params.articleId); // passing article id in url
        res.json(status);
    };
    const editArticle = async(req, res) => {
        const {articleId} = req.params;
        const updatedArticle = await dao.updateArticle(articleId, req.body); // passing article as parameter
        if (updatedArticle) {
            res.json(updatedArticle); // successed
        } else {
            res.status(401).json({message: "Failed to update article"});
        }
    };
    const findArticlesByAuthor = async(req, res) => {
        const {userId} = req.params;
        const articles = await dao.findArticleByAuthor(userId);
        res.json(articles);
    }
    const getAuthorOfTheArticle = async(req, res) => {
        const {articleId} = req.params;
        const article = await dao.findAuthorById(articleId);
        res.json(article.author);
    }
    const getAllArticles = async(req, res) => {
        const { search } = req.query;
        if (search) {
            const articles = await dao.searchArticles(search).populate('author', 'firstName lastName');
            res.json(articles);
            return;
        }
        const articles = await dao.findAllArticles().populate('author', 'firstName lastName');
        res.json(articles);
    }
    const findArticleById = async(req, res) => {
        const {articleId} = req.params;
        const article = await dao.findArticleById(articleId);
        res.json(article);
    }
    const deleteArticlesByAuthor = async(req, res) => {
        const status = await dao.deleteArticlesByAuthor(req.params.userId);
        res.json(status);
    }

    app.get("/api/articles/:articleId", findArticleById);
    app.post("/api/articles", createArticle);
    app.delete("/api/articles/:articleId", deleteArticle);
    app.put("/api/articles/:articleId", editArticle);
    app.get("/api/articles/:userId/find", findArticlesByAuthor);
    app.get("/api/articles/author/:articleId", getAuthorOfTheArticle);
    app.get("/api/articles", getAllArticles);
    app.delete("/api/articles/author/:userId", deleteArticlesByAuthor);
  

}
