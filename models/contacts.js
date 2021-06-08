import mongoose from 'mongoose';
const contactSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:32,
        trim:true
    },
    email:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        maxLength:1000,
    },
    content:{
        type:String
    }
},{timestamps:true})
module.exports = mongoose.model("Contact",contactSchema);