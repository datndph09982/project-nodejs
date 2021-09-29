import Order from '../models/order'
import formidable from 'formidable'
import _ from 'lodash';
export const create = (req,res)=>{
        let order = new Order(req.body);
        order.save((err,data)=>{
            if(err){
                return res.status(400).json({
                    error : "Order failed!!!"
                })
            }
            res.json(data);
        })
}
export const orderId = (req,res,next,id)=>{
    Order.findById(id).exec((err,order)=>{
        if(err){
            res.status(400).json({
                error : "Not find order"
            })
        }
        req.order = order;
        next();
    })
}
export const read = (req,res)=>{
    return res.json(req.order);
}
export const remove = (req,res)=>{
    let order = req.order;
    order.remove((err,deleteOrder)=>{
        if(err){
            res.status(400).json({
                error : "Not remove order"
            })
        }
        res.json({
            deleteOrder,
            massage : "Remove successfully"
        })
    })
}
export const list = (req,res)=>{
    Order.find((err,data)=>{
        if(err){
            res.status(400).json({
                error : "Not founded any order"
            })
        }
        res.json(data);
    })
}