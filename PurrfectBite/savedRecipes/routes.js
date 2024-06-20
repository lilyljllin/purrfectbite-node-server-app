import axios from 'axios';
import * as dao from './dao.js';

const MEALDB_API_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

export default function SavedRoutes(app) {
    const createSavedRecipes = async(req, res) => {
        const saved = await dao.saveRecipe(req.body);
        res.json(saved);
    }
    const deleteSavedRecipes = async(req, res) => {
        const status = await dao.deleteSaved(req.params.sid);
        res.json(status);
    }
    const getSavedRecipes = async (req, res) => {
        const {uid} = req.params;
        try {
            const savedRecipes = await dao.findSavedByUser(uid); // get a list of saved recipes from a user
            const recipeDetailsPromises = savedRecipes.map(async (saved) => {
                const response = await axios.get(`${MEALDB_API_URL}${saved.recipeId}`);
                return response.data.meals[0]; 
            });

            const recipeDetails = await Promise.all(recipeDetailsPromises);
            res.json(recipeDetails);
        } catch (err) {
            res.status(500).send(err);
        }
    };

    app.post('/api/saved', createSavedRecipes);
    app.delete('api/saved/:sid', deleteSavedRecipes);
    app.get('/api/saved/user/:uid', getSavedRecipes);
}
