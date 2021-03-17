import express from 'express';

const router = express.Router();

router.get('/category',(req,res)=>{
    res.send(`<h1>Category</h1>`);
    console.log('Category');
})
module.exports = router;