import express from 'express';
import {create,list,update,read, categoryID,remove,image} from '../controllers/category';
const router = express.Router();

router.post('/category',create);
router.get('/categories',list);
router.put('/category/:categoryID',update);
router.get('/category/:categoryID',read);
router.param('categoryID',categoryID);
router.delete('/category/:categoryID',remove);
router.get('/category/image/:categoryID',image);
module.exports = router;