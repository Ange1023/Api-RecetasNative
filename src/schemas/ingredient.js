import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Ingredient name is required'], 
        unique: true, 
        minlength: [2, 'Ingredient name must be at least 2 characters long'], 
        maxlength: [50, 'Ingredient name must not exceed 50 characters'], 
        trim: true, 
    }
});
export default mongoose.model('Ingredient', ingredientSchema);