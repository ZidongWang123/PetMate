import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

import {
  getArticle,
  getGroupArticle,
  deleteArticle,
  updateArticle,
  createArticle,
  getArticlesBySearch,
} from "../controllers/arcticleController.js";

router.get("/getGroups/:id", auth, getGroupArticle);
router.get("/getGroups/:groupId/search", auth, getArticlesBySearch);

router.get("/:id", auth, getArticle);
router.delete("/:id", auth, deleteArticle);

router.post("/", auth, createArticle);

router.patch("/:id", auth, updateArticle);
export default router;
