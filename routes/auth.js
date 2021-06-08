import express from 'express';
const router = express.Router();
import {userSignupValidator} from '../validator';
import {signup, signin, signout} from '../controllers/auth';
// import { userSignupValidator} from '../validator';

router.post('/signup',userSignupValidator, signup);
router.post('/signin',signin);
router.get('/signout',signout);
module.exports = router;