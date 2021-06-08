import Category from '../models/categories'
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash';

export const image = (req,res,next)=>{
    if(req.category.image.data){
        res.set("Content-Type",req.category.image.contentType);
        return res.send(req.category.image.data);
    }
    next();
}
// export const create = (req,res)=>{
//     const category = new Category(req.body);
//     category.save((err,data)=>{
//         if(err){
//             return res.status(400).json({
//                 error:"Khong them duoc danh muc"
//             })
//         }
//         res.json(data)
//     })
// }
export const create = (req,res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtentions = true;
    form.parse(req,(err,fields,files) =>{
        if(err){
            return res.status(400).json({
                error:"Them danh muc khong thanh cong"
            })
        }
        const {name,description} =fields;
        if(!name ||!description ){
            return res.status(400).json({
                error: "Ban can nhap day du thong tin"
            })
        }
        let category = new Category(fields);
        
            if(files.image){
                if(files.image.size > 10000000){
                    res.status(400).json({
                        error:"Ban nen upload anh duoi 100mb"
                    })
                }
                category.image.data = fs.readFileSync(files.image.path);
                category.image.contentType =files.image.type;
            }
            category.save((err,data)=>{
                if(err){
                    res.status(400).json({
                        error: "khong them duoc danh muc"
                    })
                }
                res.json(data);
            })
        
    })
}
export const list = (req,res)=>{
    Category.find((err,data)=>{
        if(err){
            error:"Khong tim thay danh muc";
        }
        res.json(data);
    })
}
// export const update = (req,res)=>{
//     const category = req.category;
//     category.name = req.body.name;
//     category.image = req.body.image;
//     category.save((err,data)=>{
//         if(err||!category){
//             res.status(400).json({
//                 error:"Khong sua duoc danh muc"
//             })
//         }
//         res.json(data);
//     })
// }
export const  update = (req,res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields,files) =>{
        if(err){
            return res.status(400).json({
                error:"Sua danh muc khong thanh cong"
            })
        }
        const {name} =fields;
        if(!name ){
            return res.status(400).json({
                error: "Ban can nhap day du thong tin"
            })
        }
        // let product = new Product(fields);
        let category = req.category;
        category = _.assignIn(category, fields);
            if(files.image){
                // if(files.image.size > 10000000){
                //     res.status(400).json({
                //         error:"Ban nen upload anh duoi 1mb"
                //     })
                // }
                category.image.data = fs.readFileSync(files.image.path);
                category.image.contentType =files.image.path;
            }
            category.save((err,data)=>{
                if(err){
                    return res.status(400).json({
                        error: "khong sua duoc san pham"
                    })
                }
                res.json(data);
            })
        
    })
}
export const categoryID = (req,res,next,id) =>{
    Category.findById(id)
    .exec((err,category)=>{
        if(err||!category){
            res.status(400).json({
                error:"Khong tim thay danh muc"
            })
        }
        req.category = category;
        next();
    })
}
export const read = (req,res) =>{
    return res.json(req.category);
}
export const remove = (req,res)=>{
    let category = req.category;
    category.remove((err,deletedCategory)=>{
        if(err||!category){
            res.status(400).json({
                error:"Khong tim thay danh muc"
            })
        }
        res.json({
            deletedCategory,
            message:"Xoa danh muc thanh cong"
        });
    })
}