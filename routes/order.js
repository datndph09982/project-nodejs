import express from 'express'
import { requireSignin } from '../controllers/auth';
import { create, remove, list, orderId, read } from '../controllers/order';
import { userById } from '../controllers/user'
const router = express.Router();
router.post('/order/:user',requireSignin,create);

router.get('/order/:orderId',read);

router.delete('/order/:orderId',remove);

router.param('orderId',orderId);

router.get('/order',list);

router.param('user',userById)

module.exports = router;