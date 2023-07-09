import express from 'express';

import { postCreate } from '../controllers/exploreController.js';
import { getRecommendTags } from '../controllers/exploreController.js';

const router = express.Router();

router.post("/createPost", postCreate);
router.get("/getRecommendTags/:keyword/:where",getRecommendTags)
export default router;
