import express from 'express';

import { postCreate } from '../controllers/exploreController.js';

const router = express.Router();

router.post("/createPost", postCreate);
export default router;
