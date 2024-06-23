import * as dao from "./dao.js";
export default function CommentRoutes(app) {
    const createComment = async (req, res) => {
        const comment = await dao.createComment(req.body);
        res.json(comment);
    }
    const findCommentsByRecipe = async (req, res) => {
        try {
            const comments = await dao.findCommentsByRecipe(req.params.rid);
            res.json(comments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    const deleteComment = async (req, res) => {
        const status = await dao.deleteComment(req.params.commentId);
        res.json(status);
    }
    const deleteCommentByUser = async (req, res) => {
        const status = await dao.deleteByUser(req.params.userId);
        res.json(status);
    }
    app.post("/api/comments", createComment);
    app.get("/api/comments/recipe/:rid", findCommentsByRecipe);
    app.delete("/api/comments/:commentId", deleteComment);
    app.delete("/api/comments/user/:userId", deleteCommentByUser)
}