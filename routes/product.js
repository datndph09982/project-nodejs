import express from 'express';
import {create,prodbycate, productById, read, list, remove, update,image, listRelated,listBySearch,list2} from '../controllers/product';
import{categoryID} from '../controllers/category';
const router = express.Router();

router.get('/products',list );
router.get('/productsDesc',list2 );
router.put('/product/:productId', update);

router.get('/product/:productId',read);
router.param('productId',productById);

router.delete('/product/:productId',remove);
router.get('/product/related/:productId',listRelated);
router.post('/products',create);
router.get('/product/image/:productId',image);
router.post('/product/search', listBySearch);

module.exports = router;