import User from '../schemas/user.js';
import mongoose from 'mongoose';
import BaseModel from '../utils/baseModel.js';
import bcrypt from "bcrypt";
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

    async updateUserProfile(userId, userData) {
        const user = await User.findById(userId);
        if (!user) return null;


        if (userData.password && userData.newPassword) {

            const samePassword = await bcrypt.compare(userData.password, user.password);

            if (samePassword) {
                user.password = await bcrypt.hash(userData.newPassword, 10);
            }
        }

        if (userData.name) user.name = userData.name;
        if (userData.lastName) user.lastName = userData.lastName;
        if (userData.email) user.email = userData.email;
        if (userData.profileImage) user.profileImage = userData.profileImage;
    
        return await user.save();
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
        const isFollowing = currentUser.following.some(id => id.equals(targetObjId));
        // Si ya sigue al usuario, lo deja de seguir; si no, lo comienza a seguir
        const update = isFollowing
            ? { $pull: { following: targetObjId } }
            : { $addToSet: { following: targetObjId } };
        return await User.findByIdAndUpdate(
            currentUserId,
            update,
            { new: true }
        );
    }

    async getProfile(userId) {
    // 1. Trae el usuario con populate
    const user = await User.findById(userId)
        .populate('createdGroups')
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