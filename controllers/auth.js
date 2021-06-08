import User from '../models/user';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import dotenv from 'dotenv';
dotenv.config();
// import {errorHandler} from 'dbErrorsHandler';
// import jwt from ''
export const signup = (req,res)=>{
    const user = new User(req.body);
    user.save((error, user)=>{
        if(error){
            return res.status(400).json({
                error:"Không thể đăng ký tài khoản!!!"
            })
        }
        
        user.salt=undefined;
        user.hashed_password = undefined;
        res.json({user});
    })
}
export const signin = (req,res)=>{
    const {email, password} = req.body;
    User.findOne({email}, (error,user)=>{
        if(error || !user){
            return res.status(400).json({
                error:'Người dùng và email không hợp lệ, hãy đăng ký!!!'
            })
        }
        if(!user.authenticate(password)){   
            return res.status(400).json({
                error:'Email hoặc mật khẩu không đúng!!!'
            })
        }
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET); //tạo mã jwt với id người dùng
        res.cookie('t', token,{expire: new Date()+9999});
        const {_id,name,email,role}= user;
        return res.json({
            token,user :{_id,email,name,role}
        })
        // console.log(token);
    })
}
export const signout = (req, res)=>{
    res.clearCookie('t');
    res.json({
        message:'Signout Success'
    })
}
export const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
});

export const isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }
    next();
}

export const isAdmin = (req, res, next) => {
    if (req.profile.role == 0) {
        return res.status(403).json({
            error: "Admin resource! Access Denined"
        })
    }
    next();
}