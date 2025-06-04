import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
    },
    name: {
        type: String,
        required: [true, 'Group name is required'], 
        unique: true,
        minlength: [3, 'Group name must be at least 3 characters long'],
        maxlength: [50, 'Group name must not exceed 50 characters'], 
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'], 
        minlength: [10, 'Description must be at least 10 characters long'],
        maxlength: [500, 'Description must not exceed 500 characters'],
        trim: true, 
    },
    image: {
        type: String,
        required: [true, 'Image URL is required'],
        validate: {
            validator: function (url) {
                return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/.test(url); 
            },
            message: 'Image URL must be a valid URL ending with jpg, jpeg, png, gif, or webp',
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
        validate: {
            validator: function (date) {
                return !date || date instanceof Date;
            },
            message: 'DeletedAt must be a valid date',
        },
    },
    isPublic: {
        type: Boolean,
        default: false, 
    },
    groupMembers: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        validate: {
            validator: function (members) {
                return Array.isArray(members);
            },
            message: 'GroupMembers must be an array of User IDs',
        },
    },
    recipes:{
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
        validate: {
            validator: function (recipes) {
                return Array.isArray(recipes);
            },
            message: 'Recipes must be an array of Recipe IDs',
        },
    }
});

export default mongoose.model('Group', groupSchema);