import recipe from "../schemas/recipe.js";
import mongoose from "mongoose";
import Basemodel from "../utils/baseModel.js";

class recipeModel extends Basemodel {
    constructor() {
        super(recipe);
    }

    async rate(recipeId, user_id, value) {
        // Primero verifica si el usuario ya ha valorado esta receta

        const existingRecipe = await recipe.findOne({
            _id: recipeId,
            "ratings.user_id": user_id
        });

        if (existingRecipe) {
            // Si existe una valoración previa, actualízala
            return await recipe.findOneAndUpdate(
                { _id: recipeId, "ratings.user_id": user_id },
                { $set: { "ratings.$.value": value } },
                { new: true }
            );
        } else {
            // Si no existe valoración previa, agrega una nueva
            return await recipe.findOneAndUpdate(
                { _id: recipeId },
                { $push: { ratings: { user_id: user_id, value: value } } },
                { new: true }
            );
        }
    }

    async paginate(filter = {}, options = { currentPage: 1, limit: 10, user_id: null }) {
        const { currentPage, limit, user_id } = options;
        const skip = (currentPage - 1) * limit;

        // 1. Obtener recetas paginadas
        const totalCount = await this.model.countDocuments(filter);
        const totalPages = Math.ceil(totalCount / limit);

        let data = await this.model.find(filter)
            .skip(skip)
            .limit(limit)
            .populate('user_id', 'name profileImage lastName');

        // 2. Si se pasa user_id, obtener favoritos y marcar cada receta
        if (user_id) {
            const User = (await import('../schemas/user.js')).default;
            const user = await User.findById(user_id).select('favoriteRecipes');
            const favSet = new Set((user?.favoriteRecipes || []).map(id => id.toString()));
            data = data.map(recipe => ({
                ...recipe.toObject({virtuals: true}),
                isFavorite: favSet.has(recipe._id.toString())
            }));
        }

        return {
            data,
            totalCount,
            totalPages,
            currentPage,
            limit
        };
    }

    // Las operaciones CRUD están en BaseModel
}

export default new recipeModel();