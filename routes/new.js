import express from 'express';
import {read, create, newById, list, remove, update} from '../controllers/new';
const router = express.Router();

router.post('/new',create);
router.get('/new/:newId',read)
router.param('newId',newById);
router.get('/news',list);
router.delete('/new/:newId',remove);
router.put('/new/:newId',update);
module.exports = router;