import CategoryService from '../services/categoryService.js';
import { catchAsync, sendResponse } from '../utils/AppError.js';

class CategoryController {
    create = catchAsync(async (req, res, next) => {
        const category = await CategoryService.createCategory(req.body);
        sendResponse(res, 201, 'Categoría creada exitosamente', { category });
    });

    getAll = catchAsync(async (req, res, next) => {
        const categories = await CategoryService.getAllCategories();
        sendResponse(res, 200, 'Categorías encontradas exitosamente', { categories });
    });

    delete = catchAsync(async (req, res, next) => {
        const category = await CategoryService.deleteCategory(req.params.id);
        if (!category) {
            return sendResponse(res, 404, 'Categoría no encontrada', null);
        }
        sendResponse(res, 200, 'Categoría eliminada exitosamente', null);
    });
}

export default new CategoryController();