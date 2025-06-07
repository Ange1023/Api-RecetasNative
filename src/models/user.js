import User from '../schemas/user.js';
import mongoose from 'mongoose';
import BaseModel from '../utils/baseModel.js';
import recipe from './recipe.js';
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

    async toggleFollowUser(currentUserId, targetUserId) {
        const currentUser = await User.findById(currentUserId);
        const targetUser = await User.findById(targetUserId);
        if (!currentUser || !targetUser) return null;

        const targetObjId = new mongoose.Types.ObjectId(targetUserId);
        const currentObjId = new mongoose.Types.ObjectId(currentUserId);

        const isFollowing = currentUser.following.some(id => id.equals(targetObjId));

        if (isFollowing) {
            // Dejar de seguir
            await User.findByIdAndUpdate(
                currentUserId,
                { $pull: { following: targetObjId } }
            );
            await User.findByIdAndUpdate(
                targetUserId,
                { $pull: { followers: currentObjId } }
            );
        } else {
            // Comenzar a seguir
            await User.findByIdAndUpdate(
                currentUserId,
                { $addToSet: { following: targetObjId } }
            );
            await User.findByIdAndUpdate(
                targetUserId,
                { $addToSet: { followers: currentObjId } }
            );
        }

        // Opcional: devuelve el usuario actualizado
        return await 
        User.findById(currentUserId)
            .populate('following', '_id name lastname profileImage')
    }

    async getProfile(userId) {
    // 1. Trae el usuario con populate
    const user = await User.findById(userId)
        .populate('createdGroups')
        .populate('following', '_id name lastname profileImage')
        .select('-password -__v -createdAt -updatedAt -deletedAt')
        .lean();

    // 2. Trae las recetas creadas por el usuario
    const recipes = await recipe.model.find({ user_id: userId })
        .populate('user_id')
        .select('-__v -createdAt -updatedAt -deletedAt -user_id')
        .lean();

    // 3. Devuelve ambos en un solo objeto
    return {
        user,
        recipes
    };
}

}
export default new userModel();