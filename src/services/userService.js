import UserModel from "../models/user.js";
import { AppError } from "../utils/appError.js";
import authService from "./authService.js";

class UserService {

    async createUser({ email, password, name, lastName, createdGroups, followedGroups, favoriteRecipes, profileImage }) {
        
        const data = await authService.signUp({
            email,
            password,
            name,
            lastName,
            createdGroups,
            followedGroups,
            favoriteRecipes,
            profileImage
        });

        if (!data) throw new AppError(400, "Error al crear el usuario", "UserService", "createUser");

        return data;
    }

    async updateUser(userId, userData) {

        const data = await UserModel.updateUser(userId, userData);
        
        if (!data) throw new AppError("User not found", 404, null);

        return data;
    }

    async deleteUser(userId) {

        const data = await UserModel.softDeleteUser(userId);
        return data;
    }

    async getUserById(userId) {
        const data = await UserModel.getUserById(userId);
        if (!data) throw new AppError("User not found", 404, null);

        return data;
    }

    async getAllUsers() {

        const data = await UserModel.getAllUsers();

        if (!data) throw new AppError("No users found", 404, null);

        return data;
    }
}
    

export default new UserService();