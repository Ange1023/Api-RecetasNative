import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
    },
    title: {
        type: String,
        unique: true,
        required: true,
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [100, 'Title must not exceed 100 characters'],
    },
    description: {
        type: String,
        required: true,
        minlength: [10, 'Description must be at least 10 characters long'],
        maxlength: [500, 'Description must not exceed 500 characters'],
    },
    steps: {
        type: Array,
        required: [true, 'Steps are required'],
        validate: {
            validator: function (steps) {
                return steps.length > 0;
            },
            message: 'At least one step is required',
        },
    },
    preparation_time: {
        type: String, // ISO 8601 duration
        required: [true, 'Preparation time is required'],
        validate: {
            validator: function (v) {
                // Validar formato ISO 8601 de duración
                return /^P(?!$)(\d+Y)?(\d+M)?(\d+D)?(T(\d+H)?(\d+M)?(\d+S)?)?$/.test(v);
            },
            message: 'Preparation time must be a valid ISO 8601 duration string',
        },
    },
    servings: {
        type: Number,
        required: [true, 'Servings are required'],
        min: [1, 'Servings must be at least 1'],
    },
    dificulty: {
        type: String,
        enum: {
            values: ['easy', 'medium', 'hard'],
            message: 'Difficulty must be either easy, medium, or hard',
        },
        required: [true, 'Difficulty is required'],
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
    ingredients: {
        type: [
            {
                ingredient_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Ingredient',
                    required: [true, 'Ingredient ID is required'],
                },
                unit: {
                    type: String,
                    enum: {
                        values: ['g', 'kg', 'ml', 'l', 'tsp', 'tbsp', 'cup', 'oz', 'lb'],
                        message: 'Unit must be one of g, kg, ml, l, tsp, tbsp, cup, oz, lb',
                    },
                },
                unit_quantity: {
                    type: Number,
                    required: [true, 'Unit quantity is required'],
                    min: [0.1, 'Unit quantity must be at least 0.1'],
                },
            }
        ],
        required: [true, 'Ingredients are required'],
        validate: {
            validator: function (ingredients) {
                return ingredients.length > 0;
            },
            message: 'At least one ingredient is required',
        },
    },
    categories: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
        required: [true, 'Categories are required'],
        validate: {
            validator: function (categories) {
                return categories.length > 0;
            },
            message: 'At least one category is required',
        },
    },
    users:{
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    },
    images: {
        type: [
            {
                url: {
                    type: String,
                    required: [true, 'Image URL is required'],
                    validate: {
                        validator: function (url) {
                            return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/.test(url);
                        },
                        message: 'Image URL must be a valid URL ending with jpg, jpeg, png, gif, or webp',
                    },
                },
            },
        ],
    },

    ratings: [
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            value: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            }
        }
    ],

});

recipeSchema.virtual('averageRating').get(function () {
    if (this.ratings.length === 0) return 0;
    const total = this.ratings.reduce((acc, rating) => acc + rating.value, 0);
    return total / this.ratings.length;
});

recipeSchema.set('toJSON', {
    virtuals: true,
});
export default mongoose.model('Recipe', recipeSchema);