import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'], 
        unique: true,
        match: [/.+@.+\..+/, 'Invalid email format'], 
    },
    password: {
        type: String,
        required: [true, 'Password is required'], 
        // minLength: [6, 'Password must be at least 6 characters long'], // El deber ser
    },
    name: {
        type: String,
        required: [true, 'Name is required'], 
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
    },
    favoriteGroups: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date
    },
});
export default mongoose.model('User', userSchema);