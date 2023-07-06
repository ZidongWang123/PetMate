import express from 'express';

import { signin, signup,modifyProfil } from '../controllers/user.js';
const router = express.Router();

router.post('/signin', signin );
router.post('/signup', signup );
router.put("modifyPofil/:userId",modifyProfil)

export default router;
