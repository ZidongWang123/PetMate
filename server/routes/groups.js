import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

import {
  getGroups,
  getGroup,
  getGroupsBySearch,
  getMyGroups,
  createGroup,
  deleteGroup,
  updateGroup,
  joinGroup,
  verifyGroup,
  addGroupPassword,
} from "../controllers/groupController.js";

//GET search groups
router.get("/search", getGroupsBySearch);
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

router.patch("/:id", auth, addGroupPassword);

export default router;
