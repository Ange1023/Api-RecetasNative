import user from '../schemas/user.js';
import RecipeService from '../services/recipeService.js';
import { catchAsync, sendResponse } from '../utils/appError.js';

class RecipeController {
    create = catchAsync(async (req, res, next) => {
        const recipe = await RecipeService.createRecipe(req.body);
        sendResponse(res, 201, 'Receta creada exitosamente', {
            recipe,
        });
    });

    update = catchAsync(async (req, res, next) => {
        const recipe = await RecipeService.updateRecipe(req.params.id, req.body);
        if(!recipe) {
            return sendResponse(res, 404, 'Receta no encontrada', null);
        }
        sendResponse(res, 200, 'Receta actualizada exitosamente', {
            recipe,
        });
    });

    delete = catchAsync(async (req, res, next) => {
        const recipe = await RecipeService.deleteRecipe(req.params.id);
        if(recipe) {
            sendResponse(res, 200, 'Receta eliminada exitosamente', null);
        }
        return sendResponse(res, 404, 'Receta no encontrada', null);
    });

    getOne = catchAsync(async (req, res, next) => {
        const recipe = await RecipeService.getRecipeById(req.params.id);
        sendResponse(res, 200, 'Receta encontrada exitosamente', {
            recipe,
        });
    });

    getAll = catchAsync(async (req, res, next) => {
        const recipes = await RecipeService.getAllRecipes();
        sendResponse(res, 200, 'Recetas encontradas exitosamente', {
            recipes,
        });
    });

    getPaginated = catchAsync(async (req, res, next) => {
        const { currentPage = 1, limit = 10, user_id = null, ...filters } = req.body;  
        // Puedes construir un filtro más avanzado aquí si lo necesitas
        const options = { currentPage: parseInt(currentPage), limit: parseInt(limit), user_id: user_id ? user_id : null };
        const result = await RecipeService.paginateRecipes(filters, options);
        sendResponse(res, 200, 'Recetas paginadas', result);
    });

    rateRecipe = catchAsync(async (req, res, next) => {
        const { recipeId, user_id, value } = req.body;
        const recipe = await RecipeService.rateRecipe(recipeId, user_id, value);
        if(!recipe) {
            return sendResponse(res, 404, 'Receta no encontrada', null);
        }
        sendResponse(res, 200, 'Receta valorada exitosamente', {
            recipe,
        });
    });

}

export default new RecipeController();