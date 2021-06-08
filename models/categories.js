import mongoose from 'mongoose';
import formidable from 'formidable';
// 
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32
    },
    description:{
        type:String,
        required: true
    },
    image:{
        data:Buffer,
        contentType: String
    }
},{timestamps:true});

module.exports = mongoose.model("Category", categorySchema);