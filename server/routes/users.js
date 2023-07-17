import express from "express";
import auth from "../middleware/auth.js";

import {
  signin,
  signup,
  modifyPersonalInfo,
  updateMembership,
  getPersonalInfo,
  getArticles,
} from "../controllers/user.js";
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.put("/modifyPersonalInfo/:userId", modifyPersonalInfo);
router.patch("/updateMembership/:id", updateMembership);
router.get("/getPersonalInfo/:userId", getPersonalInfo);
router.get("/articles/:userId", auth, getArticles);

export default router;
