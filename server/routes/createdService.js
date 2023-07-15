import express from "express";
import auth from "../middleware/auth.js";
import {
  getServicesByUser
} from "../controllers/createdService.js";

const router = express.Router();

router.get("/:id", auth, getServicesByUser);


export default router;