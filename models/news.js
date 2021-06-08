import mongoose from 'mongoose';
const newSchema = mongoose.Schema({
    titlenews: {
        type: String,
        trim: true,
        required: true,
        maxLength: 2000
    },
    image:{
        required:false,
        type:String
    },
    content:{
        required:true,
        type:String
    },
},{timestamps:true});

module.exports = mongoose.model("New", newSchema);