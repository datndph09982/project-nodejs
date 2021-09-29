import express from 'express';
import {create,prodbycate, productById, read, list, remove, update,image, listRelated,listBySearch,list2} from '../controllers/product';
import { requireSignin, isAdmin, isAuth} from '../controllers/auth';
import {userById} from '../controllers/user';
const router = express.Router();

router.get('/products',list );

router.get('/productsDesc',list2 );

router.put('/product/:productId/:user',requireSignin,isAuth,isAdmin, update);

router.get('/product/:productId',read);

router.param('productId',productById);

router.param('user',userById);

router.delete('/product/:productId/:user',requireSignin,isAuth,isAdmin, remove);

router.get('/product/related/:productId',listRelated);

router.post('/products/:user',requireSignin,isAuth,isAdmin, create);

router.get('/product/image/:productId',image);

router.post('/product/search', listBySearch);

module.exports = router;