import authService from "../services/authService.js";
import { catchAsync, sendResponse } from "../utils/AppError.js";

class authController  {

    signUp = catchAsync(async (req, res, next) => {

        const user = await authService.signUp(req.body);
        sendResponse(res, 201, "Usuario creado exitosamente", {
            user,
        });

    });

    signIn = catchAsync(async (req, res, next) => {

        const token = await authService.signIn(req.body);
        sendResponse(res, 200, "Usuario autenticado exitosamente", {
            token,
        });
        
    });

    signOut = catchAsync(async (req, res, next) => {
        sendResponse(res, 200, "Usuario desconectado exitosamente", null);
    });
}

export default new authController();