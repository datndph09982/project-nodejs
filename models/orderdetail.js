import mongoose from 'mongoose'
const { ObjectId } =  mongoose.Schema;
const orderDetailSchema =  mongoose.Schema({
    id_product : {
        type : ObjectId,
        ref : "Product",
        required : true
    },
    name : {
        type : String,
        trim : true,
        required : true,
    },
    image : {
        type : String,
        trim : true,
        required : false,
    },
    price : {
        type : Number,
        trim : true,
        required : true,
    },
    cate_id : {
        type : ObjectId,
        ref : "Category",
        required : true
    },
    sl : {
        type : Number,
        trim : true,
        required : true,
        maxLength : 32
    },
    id_order : {
        type : ObjectId,
        ref : "Order",
        required : true
    }

},{timestamps : true})
module.exports = mongoose.model ("OrderDetail",orderDetailSchema);