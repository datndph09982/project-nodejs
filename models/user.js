import mongoose from 'mongoose';
import crypto from 'crypto';
import {v1 as uuidv1} from 'uuid';
// import { timestamps } from 'console';

const userSchema = new mongoose.Schema({
    // username:{
    //     type:String,
    //     trim : true,
    //     required : true,
    //     maxlength: 32
    // },
    name:{
        type:String,
        trim : true,
        required : true,
        maxlength: 32
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    hashed_password:{
        type: String,
        required: true
    },
    about:{
        type: String,
        trim:true
    },
    salt:{
        type:String
    },
    role:{
        type: Number,
        default: 1
    },
    history:{
        type:Array,
        default:[]
    }

},{timestamps: true})

userSchema.virtual('password')// tạo ra 1 field ảo
    .set(function(password){ //password nhập vào 
        this.salt = uuidv1() //mã hóa pass thành unique
        this.hashed_password = this.encrytPassword(password); //gán hashed_pass bằng phương thức mới
    })
userSchema.methods = { //tạo phương thức mới
    authenticate : function(plainText){ //mã hóa password
        return this.encrytPassword(plainText) ===this.hashed_password;
    },
    encrytPassword: function(password){
        if(!password) return '';
        try{
            return crypto
            .createHmac('sha1',this.salt)
            .update(password)
            .digest('hex');
        }catch(error){
            return "";
        }
    }
}

module.exports = mongoose.model('User',userSchema);

