import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

import {
  getGroups,
  getGroup,
  getMyGroups,
  createGroup,
  deleteGroup,
  updateGroup,
  joinGroup,
  verifyGroup,
} from "../controllers/groupController.js";

//GET all groups
router.get("/", getGroups);

//GET my group
router.get("/mygroups", auth, getMyGroups);

//GET a single group
router.get("/:id", auth, getGroup);

//Join a group
router.post("/:id/joinGroup", auth, joinGroup);
router.post("/:id/verifyGroup", auth, verifyGroup);

//POST a new group
router.post("/", auth, createGroup);

//DELETE a group
router.delete("/:id", auth, deleteGroup);

//UPDATE a group
router.patch("/:id", auth, updateGroup);

export default router;
