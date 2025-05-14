import User from '../Schemas/user.js';
import mongoose from 'mongoose';

class userModel {

    async createUser(userData) {
        return await User.create(userData);
    }

    async updateUser(userId, userData) {
        return await User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(userId) }, userData, { new: true });
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
}
export default new userModel();