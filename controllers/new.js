import New from '../models/news';
export const read = (req,res) =>{
    return res.json(req.news);
}
export const newById = (req,res,next,id) =>{
    New.findById(id).exec( (err,news)=>{
        if(err||!news){
            return res.status(400).json({
                error:"Khong tim thay bai viet"
            })
        }
        req.news = news;
        next();
    })
}
export const create = (req,res)=>{
    const news = new New(req.body);
    news.save((err,data) =>{
        if(err){
            return res.status(400).json({
                error:"Add news failed"
            })
        }
        res.json(data);
    })
}
export const list = (req,res) =>{
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? +req.query.limit : 20;

    New.find()
        .select("-photo")
        // .populate('category')
        // .sort([[order, sortBy]])
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "News not found"
                })
            }
            res.json(data);
        })
}
export const update = (req,res)=>{
    const news = req.news;
    news.titlenews = req.body.titlenews;
    news.content = req.body.content;
    news.image = req.body.image;
    news.save((err,data)=>{
        if(err||!news){
            res.status(400).json({
                error:"Khong sua duoc bai viet"
            })
        }
        res.json(data);
    })
}
export const remove = (req,res) =>{
    let news = req.news;
    news.remove((err,deleteNews) =>{
        if(err){
            return res.status(400).json({
                error:"khong xoa duoc bai viet"
            })
        }
        res.json({
            deleteNews,
            message:"Bai viet da duoc xoa"
        })
    })
}