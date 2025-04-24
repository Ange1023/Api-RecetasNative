import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    approved: {
        type: Boolean,
        default: false,
    }
});
export default mongoose.model('Ingredient', ingredientSchema);