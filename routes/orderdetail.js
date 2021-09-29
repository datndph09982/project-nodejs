import express from 'express'
import { requireSignin } from '../controllers/auth';
import { create , list, OrderDetailByOrderId, read} from '../controllers/orderDetail';

import { userById } from '../controllers/user'

const router = express.Router();

router.post('/orderdetail/:userId',requireSignin,create);

router.get('/orderdetail',list);

router.get('/orderdetail/:OrderDetailByOrderId',read);

router.param('OrderDetailByOrderId',OrderDetailByOrderId);

router.param('userId',userById)

module.exports = router;