import express from 'express';
import {create,list,read, contactID,remove} from '../controllers/contact';
const router = express.Router();

router.post('/contact',create);
router.get('/contacts',list);
router.get('/contact/:contactID',read);
router.param('contactID',contactID);
router.delete('/contact/:contactID',remove);
module.exports = router;