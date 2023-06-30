import express from "express";

const router = express.Router();

import {
  getGroups,
  getGroup,
  createGroup,
  deleteGroup,
  updateGroup,
} from "../controllers/groupController.js";

//GET all groups
router.get("/", getGroups);

//GET a single group
router.get("/:id", getGroup);

//POST a new group
router.post("/", createGroup);

//DELETE a group
router.delete("/:id", deleteGroup);

//UPDATE a group
router.patch("/:id", updateGroup);

export default router;
