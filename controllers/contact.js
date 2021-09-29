import Contact from '../models/contacts'
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash';
// export const create = (req,res)=>{
//     const contact = new Contact(req.body);
//     contact.save((err,data)=>{
//         if(err){
//             return res.status(400).json({
//                 error:"Khong them duoc lien he"
//             })
//         }
//         res.json(data)
//     })
// }
export const create = (req,res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtentions = true;
    form.parse(req,(err,fields,) =>{
        if(err){
            return res.status(400).json({
                error:"Them contact khong thanh cong"
            })
        }
        const {name,email} =fields;
        if(!name ||!email ){
            return res.status(400).json({
                error: "Ban can nhap day du thong tin"
            })
        }
        let contact = new Contact(fields);
            contact.save((err,data)=>{
                if(err){
                    res.status(400).json({
                        error: "khong them duoc contact"
                    })
                }
                res.json(data);
            })
        
    })
}
export const list = (req,res)=>{
    Contact.find((err,data)=>{
        if(err){
            error:"Khong tim thay lien he";
        }
        res.json(data);
    })
}
export const contactID = (req,res,next,id) =>{
    Contact.findById(id)
    .exec((err,contact)=>{
        if(err||!contact){
            res.status(400).json({
                error:"Khong tim thay lien he"
            })
        }
        req.contact = contact;
        next();
    })
}
export const read = (req,res) =>{
    return res.json(req.contact);
}
export const remove = (req,res)=>{
    let contact = req.contact;
    contact.remove((err,deletedContact)=>{
        if(err||!contact){
            res.status(400).json({
                error:"Khong tim thay lien he"
            })
        }
        res.json({
            deletedContact,
            message:"Xoa lien he thanh cong"
        });
    })
}