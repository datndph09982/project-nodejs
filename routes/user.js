import express from 'express';
const router = express.Router();

import { userById, read, update, list } from '../controllers/user';
import { requireSignin, isAdmin, isAuth } from "../controllers/auth";

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
});
router.get('/users',list);

// router.get('/user/:userId', requireSignin, isAuth, read);

router.get('/user/:userId', read);

router.put('/user/:userId',  update);

router.param('userId', userById);

module.exports = router;