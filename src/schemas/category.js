import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'], 
        unique: true,
        minlength: [3, 'Category name must be at least 3 characters long'], 
        maxlength: [50, 'Category name must not exceed 50 characters'], 
        trim: true, 
    }
});
export default mongoose.model('Category', categorySchema);