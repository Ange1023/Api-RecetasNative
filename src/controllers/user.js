import BaseController from '../utils/BaseController.js';
import User from '../schemas/users.js';
import { AppError, catchAsync } from '../utils/AppError.js';

class UserController extends BaseController {
    constructor() {
        super(User, {
            create: {
                success: "Usuario creado exitosamente",
                failure: "Error al crear el usuario",
            },
            getAll: {
                success: "Lista de usuarios obtenida exitosamente",
            },
            getOne: {
                success: "Usuario encontrado",
                failure: "Usuario no encontrado",
            },
            update: {
                success: "Usuario actualizado correctamente",
                failure: "Error al actualizar el usuario",
            },
            delete: {
                success: "Usuario eliminado correctamente",
                failure: "Error al eliminar el usuario",
            },
        });
    }

    getAll = catchAsync(async (req, res, next) => {
        const users = await this.model.find();
        this.sendResponse(res, 200, "Lista de usuarios encontrada exitosamente", users);
    }
    );

    // Sobrescribe getOne si necesitas lógica personalizada
    getOne = catchAsync(async (req, res, next) => {
        const user = await this.model.findById(req.params.id);
        if (!user) throw new AppError("Usuario no encontrado", 404);
        this.sendResponse(res, 200, "Usuario encontrado", user);
    });
}

export default new UserController();