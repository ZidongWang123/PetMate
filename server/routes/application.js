import express from "express";
import auth from "../middleware/auth.js";
import { getApplicationsByActivityId, createApplication, updateApplication } from "../controllers/application.js";

const router = express.Router();

//router.get("/:id", auth, getApplicationsByActivityId);
router.get("/", auth, getApplicationsByActivityId);
router.post("/", auth, createApplication);
router.patch("/:id", updateApplication);

export default router;