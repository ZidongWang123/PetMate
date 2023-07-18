import express from 'express';

import { postCreate } from '../controllers/exploreController.js';
import { getPopularTags,getRecommendTags, getExplorePosts,modifyLikes,getSinglePost,deletePost,modifyPost} from '../controllers/exploreController.js';


const router = express.Router();

router.post("/createPost", postCreate);
router.get("/getRecommendTags/:keyword/:where",getRecommendTags)
router.get("/getPosts",getExplorePosts)
router.put("/modifyLikes/:postId",modifyLikes)
router.get("/getSinglePost/:postId",getSinglePost)
router.delete("/deletePost/:postId",deletePost)
router.put("/modifyPost/:postId",modifyPost)
router.get("/getPopularTags",getPopularTags)
export default router;
