import axios from 'axios';
import * as dao from './dao.js';

const MEALDB_API_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

export default function SavedRoutes(app) {
    const createSavedRecipes = async (req, res) => {
        const { userId, recipeId} = req.body;
        const checkSaved = await dao.existingSaved(userId, recipeId);
        if (checkSaved) {
            throw new Error("Recipe already saved by user.");
        }
        const saved = await dao.saveRecipe(req.body);
        res.json(saved);
    }
    const deleteSavedRecipes = async (req, res) => {
        const { userId, recipeId } = req.query;
        try {
            await dao.deleteSaved(userId, recipeId);
            res.sendStatus(204);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    const getSavedRecipes = async (req, res) => {
        const { uid } = req.params;
        try {
            const savedRecipes = await dao.findSavedByUser(uid); // get a list of saved recipes from a user
            const recipeDetailsPromises = savedRecipes.map(async (saved) => {
                const response = await axios.get(`${MEALDB_API_URL}${saved.recipeId}`);
                const recipeDetails = response.data.meals[0];
                return { ...recipeDetails, note: saved.note }; // Attach the note to the recipe details
            });
    
            const recipeDetails = await Promise.all(recipeDetailsPromises);
            res.json(recipeDetails);
        } catch (err) {
            res.status(500).send(err);
        }
    };
    
    const checkIfRecipeIsSaved = async (req, res) => {
        const { userId, recipeId } = req.query;
        try {
            const checkSaved = await dao.existingSaved(userId, recipeId);
            res.json(checkSaved);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    const findRecentSavedRecipeByUser = async (req, res) => {
        const { userId } = req.params;
        const recent = await dao.getMostRecentRecipe(userId);
        res.json(recent);
    }

    app.post('/api/saved', createSavedRecipes);
    app.delete('/api/saved', deleteSavedRecipes);
    app.get('/api/saved/user/:uid', getSavedRecipes);
    app.get('/api/saved/find', checkIfRecipeIsSaved);
    app.get('/api/saved/recent/:userId', findRecentSavedRecipeByUser);
}
