import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    steps:{
        type: Array,
        required: true,
    },
    preparation_time: {
        type: Number,
        required: true,
    },
    servings: {
        type: Number,
        required: true,
    },
    dificulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true,
    },
    isPublic: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    groups:{
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}],
    },
    tags:{
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    },
    ingredients: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}],
        required: true,
    },
    categories: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
        required: true,
    },
    images: {
        type: [{
            url: {
                type: String,
                required: true,
            },
        }],
        required: true,
    }

});
export default mongoose.model('Recipe', recipeSchema);