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
        await RecipeService.deleteRecipe(req.params.id);
        if(!recipe) {
            return sendResponse(res, 404, 'Receta no encontrada', null);
        }
        sendResponse(res, 200, 'Receta eliminada exitosamente', null);
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
}

export default new RecipeController();