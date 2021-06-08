import mongoose from 'mongoose';
const {ObjectId} =mongoose.Schema;
const productSchema = mongoose.Schema({
    name:{
        type: String,
        strim: true,
        maxLength: 32,
        required: true
    },
    description:{
        type:String,
        require:true,
        
    },
    price:{
        type: Number,
        required:true
    },
    categoryId:{
        type:ObjectId,
        ref:"Category",
        required:false
    },
    image:{
        data:Buffer,
        contentType: String
        // type:String
    },
    status:{
        required: true,
        type: Boolean
    },
    quantity:{
        type: Number,
        default: 0
    }
},{ timestamps: true});
module.exports = mongoose.model("Product", productSchema)