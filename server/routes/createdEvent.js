import express from "express";
import auth from "../middleware/auth.js";
import {
  getEventsByUser
} from "../controllers/createdEvents.js";

const router = express.Router();

router.get("/:id", auth, getEventsByUser);


export default router;