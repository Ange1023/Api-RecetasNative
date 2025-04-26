import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tag name is required'], 
        unique: true, 
        minlength: [2, 'Tag name must be at least 2 characters long'],
        maxlength: [30, 'Tag name must not exceed 30 characters'], 
        trim: true, 
    }
});
export default mongoose.model('Tag', tagSchema);