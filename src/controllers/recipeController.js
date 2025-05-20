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

    getPaginated = catchAsync(async (req, res, next) => {
        const { currentPage = 1, limit = 10, ...filters } = req.body;
        // Puedes construir un filtro más avanzado aquí si lo necesitas
        const options = { currentPage: parseInt(currentPage), limit: parseInt(limit) };
        const result = await RecipeService.paginateRecipes(filters, options);
        sendResponse(res, 200, 'Recetas paginadas', result);
    });

}

export default new RecipeController();