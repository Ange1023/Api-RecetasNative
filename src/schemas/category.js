import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'], 
        unique: true,
        minlength: [3, 'Category name must be at least 3 characters long'], 
        maxlength: [50, 'Category name must not exceed 50 characters'], 
        trim: true, 
    },
    image:{
        type: String,
        required: [true, 'Category image is required'], 
        validate: {
            validator: function (v) {
                return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/.test(v);
            },
            message: 'Image URL must be a valid URL ending with .png, .jpg, .jpeg, or .gif',
        },
    }
});
export default mongoose.model('Category', categorySchema);