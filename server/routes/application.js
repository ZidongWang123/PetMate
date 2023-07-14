import express from "express";
import auth from "../middleware/auth.js";
import { getApplicationsByActivityId, createApplication, updateApplication, getApplicationsByApplicantId } from "../controllers/application.js";

const router = express.Router();

//router.get("/:id", auth, getApplicationsByActivityId);
router.get("/", auth, getApplicationsByActivityId);
router.get("/:id", auth, getApplicationsByApplicantId);
router.post("/", auth, createApplication);
router.patch("/:id", updateApplication);

export default router;