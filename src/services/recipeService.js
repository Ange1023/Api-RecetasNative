import recipeModel from '../models/recipe.js';

class RecipeService {

    async createRecipe({
        title,
        description,
        steps,
        preparation_time,
        servings,
        dificulty,
        isPublic,
        ingredients,
        categories,
        tags,
        groups,
        users,
        images,
        user_id
    }) {
        const data = await recipeModel.create({
            title,
            description,
            steps,
            preparation_time,
            servings,
            dificulty,
            isPublic,
            ingredients,
            categories,
            tags,
            groups,
            users,
            images,
            user_id
        });
        return data;
    }

    async updateRecipe(recipeId, recipeData) {
        const data = await recipeModel.update(recipeId, recipeData);
        return data;
    }

    async deleteRecipe(recipeId) {
        const data = await recipeModel.delete(recipeId);
        return data;
    }

    async getRecipeById(recipeId) {
        const data = await recipeModel.findById(recipeId);
        return data;
    }

    async getAllRecipes() {
        const data = await recipeModel.findAll();
        return data;
    }

    async paginateRecipes(filter = {}, options = { currentPage: 1, limit: 10 }) {
        const data = await recipeModel.paginate(filter, options);
        return data;
    }

    async rateRecipe(recipeId, user_id, rating) {
        const data = await recipeModel.rate(recipeId, user_id, rating);
        return data;
    }

}

export default new RecipeService();