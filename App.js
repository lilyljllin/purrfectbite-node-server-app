import session from "express-session";
import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import UserRoutes from "./PurrfectBite/users/routes.js";
import CommentRoutes from "./PurrfectBite/comments/routes.js";
import SavedRoutes from "./PurrfectBite/savedRecipes/routes.js";
import ArticleRoutes from "./PurrfectBite/articles/routes.js";
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb+srv://lilyljllin:Rkf1KbbFvJZ4vRx3@cluster0.vopctxq.mongodb.net/recipeweb"
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
}));
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "purrfectbite",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    }
};
app.use(
    session(sessionOptions)
);
app.use(express.json());
UserRoutes(app);
CommentRoutes(app);
SavedRoutes(app);
ArticleRoutes(app);
app.listen(process.env.PORT || 4000);