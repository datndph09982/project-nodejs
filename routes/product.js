import express from 'express';

const router = express.Router();

router.get('/products',(req,res) => {
    res.send(`<h1>Products list</h1>`)
    console.log('Product List');
});

router.get('/products/:2',(req,res)=>{
    res.send(`<h2>Detail product</h2>`)
    console.log('Detail product');
})

module.exports = router;