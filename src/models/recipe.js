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

    async paginate(filter = {}, options = { currentPage: 1, limit: 10 }) {
        // Implementación de paginación
        const { currentPage, limit } = options;
        const skip = (currentPage - 1) * limit;

        const totalCount = await this.model.countDocuments(filter);
        const totalPages = Math.ceil(totalCount / limit);

        const data = await this.model.find(filter)
            .skip(skip)
            .limit(limit)
            .populate('user_id', 'name profileImage lastName') // Población de datos del usuario

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