import express from 'express';
import {create,list,update,read, categoryID,remove,image} from '../controllers/category';
import { requireSignin, isAdmin, isAuth} from '../controllers/auth';
import {userById} from '../controllers/user';
const router = express.Router();

router.post('/category/:user',requireSignin,isAuth,isAdmin,create);

router.get('/categories',list);

router.put('/category/:categoryID/:user',requireSignin,isAuth,isAdmin,update);

router.get('/category/:categoryID',read);

router.param('categoryID',categoryID);

router.delete('/category/:categoryID/:user',requireSignin,isAuth,isAdmin,remove);

router.get('/category/image/:categoryID',image);

router.param('user',userById);
module.exports = router;