import express from 'express';

import { signin, signup,modifyPersonalInfo,getPersonalInfo } from '../controllers/user.js';
const router = express.Router();

router.post('/signin', signin );
router.post('/signup', signup );
router.put("/modifyPersonalInfo/:userId",modifyPersonalInfo)
router.get("/getPersonalInfo/:userId",getPersonalInfo)

export default router;
