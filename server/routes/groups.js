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

//Join a group
router.post("/:id/verifyGroup", auth, verifyGroup);
router.post("/:id/joinGroup", auth, joinGroup);

//GET a single group
router.get("/:id", auth, getGroup);
//POST a new group
router.post("/", auth, createGroup);

//DELETE a group
router.delete("/:id", auth, deleteGroup);

//UPDATE a group
router.patch("/:id/addGroupPassword", auth, addGroupPassword);
router.patch("/:id", auth, updateGroup);

export default router;
