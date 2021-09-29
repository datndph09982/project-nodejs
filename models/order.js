import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema;
const orderSchema =  mongoose.Schema({
    id_order:{
        type: ObjectId,
        ref:'User',
        required:true
    },
    name_order:{
        type:String,
        trim:true,
        maxLength:32,
        required:true
    },
    address:{
        type:String,
        trim:true,
        required:true
    },
    phone:{
        type:Number,
        trim:true,
        maxLength:11,
        required: false
    },
    totalprice:{
        type:Number,
        trim:true,
        required:true
    }
},{timestamps:true})
module.exports = mongoose.model("Order",orderSchema);