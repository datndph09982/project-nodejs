import OrderDetail from '../models/orderDetail'
import formidable from 'formidable'
import _ from 'lodash';
export const create = (req,res)=>{
    // let form = formidable.IncomingForm();
    // form.keepExtenstions = true;
    // form.parse(req, (err,fields) => {
    //     if(err){
    //         return res.json.status(400)({
    //             error : "k thêm được orderDetail"
    //         })
    //     }
    //     //  kiểm tra dữ liệu có được nhập hay k
    //     const { id_product,name,image,price,cate_id,status,sl,id_order,} = fields ;
    //     if(!id_product || !name || !image || !price ||!cate_id || !status || !sl || !id_order ){
    //         return res.json.status(400)({
    //             error : " không được để trống !"
    //         })
    //     }
        let orderDetail = new OrderDetail(req.body);
        // let orderDetail = new OrderDetail(fields);

        orderDetail.save((err,data)=>{
            if(err){
                return res.status(400).json({
                    error : "Add order don't success"
                })
            }
            res.json(data);
        })
    
    // })
}
export const list = (req,res) =>{
    OrderDetail.find((err,data)=>{
        if(err){
            res.status(400).json({
                error : "Not founded any order"
            })
        }
        res.json(data);
    })
}
export const read = (req,res)=>{
    return res.json(req.orderDetail);
}
export const OrderDetailByOrderId = (req,res,next,id_order)=>{
    OrderDetail.find({id_order :id_order}).exec((err,orderDetail)=>{
        if(err){
            res.status(400).json({
                error : "Not founded order by id"
            })
        }
        req.orderDetail=orderDetail;
        next();
    })
}
