import User from '../schemas/user.js';
import mongoose from 'mongoose';
import BaseModel from '../utils/baseModel.js';

class userModel extends BaseModel {
    
    constructor() {
        super(User);
    }
    
    async createUser(userData) {
        return await User.create(userData);
    }

    async updateUser(userId, userData) {
        return await User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(userId) }, userData, { new: true, runValidators: true });
    }

    async softDeleteUser(userId) {
        return await User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(userId) }, { deletedAt: new Date() }, { new: true });
    }

    async deleteUser(userId) {
        return await User.findOneAndDelete({_id: new mongoose.Types.ObjectId(userId)  });
    }

    async getUserById(userId) {
        return await User.findById(userId);
    }
    async getAllUsers() {
        return await User.find();
    }

    async getOne(filter){
        return await User.findOne(filter);
    }

    async toggleFavoriteRecipe(userId, recipeId) {
        const user = await User.findById(userId);
        if (!user) return null;

        const recipeObjId = new mongoose.Types.ObjectId(recipeId);
        const isFavorite = user.favoriteRecipes.some(id => id.equals(recipeObjId));

        // Si ya es favorita, la elimina; si no, la agrega
        const update = isFavorite
            ? { $pull: { favoriteRecipes: recipeObjId } }
            : { $addToSet: { favoriteRecipes: recipeObjId } };

        return await User.findByIdAndUpdate(
            userId,
            update,
            { new: true }
        );
    }

}
export default new userModel();