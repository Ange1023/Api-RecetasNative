
import UserModel from "../models/user.js";
import authService from "./authService.js";

class UserService {

    async createUser({ email, password, name, lastName, createdGroups, followedGroups, favoriteRecipes }) {
        
        const data = await authService.signUp({
            email,
            password,
            name,
            lastName,
            createdGroups,
            followedGroups,
            favoriteRecipes
        });
    }

    async updateUser(userId, userData) {

        const data = await UserModel.updateUser(userId, userData);
        return data;
    }

    async deleteUser(userId) {

        const data = await UserModel.deleteUser(userId);
        return data;
    }

    async getUserById(userId) {

        const data = await UserModel.getUserById(userId);
        return data;
    }

    async getAllUsers() {

        const data = await UserModel.getAllUsers();
        return data;
    }

}
    

export default new UserService();