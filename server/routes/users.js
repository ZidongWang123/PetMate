import express from 'express';
import auth from "../middleware/auth.js";

import { signin, signup,modifyPersonalInfo,getPersonalInfo,getArticles } from '../controllers/user.js';
const router = express.Router();

router.post('/signin', signin );
router.post('/signup', signup );
router.put("/modifyPersonalInfo/:userId",modifyPersonalInfo)
router.get("/getPersonalInfo/:userId",getPersonalInfo)
router.get('/articles', auth,getArticles );

export default router;
