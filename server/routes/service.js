import express from "express";
import auth from "../middleware/auth.js";
import { getServices, createService, updateService, deleteService } from "../controllers/services.js";

const router = express.Router();

router.get("/", auth, getServices);
router.post("/", auth, createService);
router.patch("/:id", auth, updateService);
router.delete("/:id", auth, deleteService);

export default router;