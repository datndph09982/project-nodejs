import Product from '../models/products';
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash';
// export const create = (req,res) =>{
//     const product = new Product(req.body);
//     product.save((err,data) =>{
//         if(err){
//             return res.status(400).json({
//                 error:"Add product failed"
//             })
//         }
//         res.json(data);
//     })
// }

export const image = (req,res,next)=>{
    if(req.product.image.data){
        res.set("Content-Type",req.product.image.contentType);
        return res.send(req.product.image.data);
    }
    next();
}
export const create = (req,res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtentions = true;
    form.parse(req,(err,fields,files) =>{
        if(err){
            return res.status(400).json({
                error:"Them san pham khong thanh cong"
            })
        }
        const {name, description, price,status} =fields;
        if(!name || !description || !price || !status ){
            return res.status(400).json({
                error: "Ban can nhap day du thong tin"
            })
        }
        let product = new Product(fields);
            if(files.image){
                if(files.image.size > 10000000){
                    res.status(400).json({
                        error:"Ban nen upload anh duoi 1mb"
                    })
                }
                product.image.data = fs.readFileSync(files.image.path);
                product.image.contentType =files.image.type;
            }
            product.save((err,data)=>{
                if(err){
                    res.status(400).json({
                        error: "khong them duoc san pham"
                    })
                }
                res.json(data);
            })
        
    })
}
// export const list =(req,res)=>{
//     Product.find((err,data) =>{
//         if(err){
//             error:"khong tim thay san pham"
//         }
//         res.json(data)
//     })
    
// }
export const productById = (req,res,next,id)=>{
    Product.findById(id)
        .populate('categoryId')
        .exec( (err,product)=>{
        if(err||!product){
            return res.status(400).json({
                error:"Khong tim thay san pham"
            })
        }
        req.product = product;
        next();
    })
}
export const read = (req,res) =>{
    return res.json(req.product);
}
export const remove = (req,res) =>{
    let product = req.product;
    product.remove((err,deletedProduct) =>{
        if(err){
            return res.status(400).json({
                error:"khong xoa duoc san pham"
            })
        }
        res.json({
            deletedProduct,
            message:"San pham da duoc xoa"
        })
    })
}
// export const update = (req,res)=>{
//     const product = req.product;
//     product.name = req.body.name;
//     product.description = req.body.description;
//     product.price = req.body.price;
//     product.image = req.body.image;
//     product.quantity = req.body.quantity;
//     product.status = req.body.status;
//     product.category = req.body.category;
//     product.save((err,data)=>{
//         if(err||!product){
//             res.status(400).json({
//                 error:"Khong sua duoc san pham"
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
                error:"Sua san pham khong thanh cong"
            })
        }
        const {name, description, price} =fields;
        if(!name || !description || !price){
            return res.status(400).json({
                error: "Ban can nhap day du thong tin"
            })
        }
        // let product = new Product(fields);
        let product = req.product;
        product = _.assignIn(product, fields);
        
            if(files.image){
                // if(files.image.size > 10000000){
                //     res.status(400).json({
                //         error:"Ban nen upload anh duoi 1mb"
                //     })
                // }
                product.image.data = fs.readFileSync(files.image.path);
                product.image.contentType =files.image.path;
            }
            product.save((err,data)=>{
                if(err){
                    return res.status(400).json({
                        error: "khong sua duoc san pham"
                    })
                }
                res.json(data);
            })
        
    })
}

/*
* Sell
* by sell = /products?sortBy=sold&order=desc&limit=4
* by arrival = /products?sortBy=createdAt&order=desc&limit=4
* Nếu không có tham số nào được nhận thì sẽ trả về tất cả sản phẩm
*/
export const list = (req, res) => {
    let order = req.query.order ? +req.query.order : 'desc';
    let sortBy = req.query.sortBy ? +req.query.sortBy : '_id';
    let limit = req.query.limit ? +req.query.limit : 40;

    Product.find()
        .select("-photo")
        .populate('categoryId')
        .sort({price:1})
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "Product not found",
                })
            }
            res.json(data)
        })
}
export const list2 = (req, res) => {
    let order = req.query.order ? +req.query.order : 'desc';
    let sortBy = req.query.sortBy ? +req.query.sortBy : '_id';
    let limit = req.query.limit ? +req.query.limit : 40;

    Product.find()
        .select("-photo")
        .populate('categoryId')
        .sort({price:-1})
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "Product not found",
                })
            }
            res.json(data)
        })
}

/**
 * Module này sẽ trả về các sản phẩm có cùng danh mục 
 */
export const listRelated = (req, res) => {
    let limit = req.query.limit ? req.query.limit : 3;

    Product.find({
        _id: { $ne: req.product },
        categoryId: req.product.categoryId
    }) // $ne: not include
        .limit(limit)
        .populate('categoryId', '_id name',)
        .exec((err, products) => {
            if (err) {
                res.status(400).json({
                    error: "Products not found"
                })
            }
            res.json(products);
        })
}
/**
 * Hiển thị danh sách sản phẩm khi tìm kiếm
 * Được áp dụng khi tìm kiếm ở react hoặc js project
 * Hiển thị các danh mục trong checkbox và khoảng giá trong radio buttons
 * user click vào checkbox và radio buttons
 * sẽ thiết kế api và hiển thị danh sách sản phẩm mà người dùng tìm kiếm
 */
 export const listBySearch = (req,res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? +req.query.limit : 6;
    let skip = parseInt(req.body.skip);
    let findArgs = {}


    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte - greater than price [0 - 10]
                // lte - nhỏ hơn 
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1],
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
    Product.find(findArgs)
        .select("-photo")
        .populate("categoryId")
        // .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "Products not found"
                })
            }
            res.json({
                size: data.length,
                data
            })
        });
}