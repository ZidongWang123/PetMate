import express from "express";
import auth from "../middleware/auth.js";
import { getApplicationsByActivityId, createApplication, updateApplication, getApplicationsByApplicantId, deleteApplication } from "../controllers/application.js";

const router = express.Router();

//router.get("/:id", auth, getApplicationsByActivityId);
router.get("/", auth, getApplicationsByActivityId);
router.get("/:id", auth, getApplicationsByApplicantId);
router.post("/", auth, createApplication);
router.patch("/:id", updateApplication);
router.delete("/:id", auth, deleteApplication);

export default router;