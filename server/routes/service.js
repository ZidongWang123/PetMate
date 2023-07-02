import express from "express";
import auth from "../middleware/auth.js";
import { getService, getServices, getServicesBySearch, createService, updateService, deleteService } from "../controllers/service.js";

const router = express.Router();

router.get('/:id', getService);
router.get('/', getServices);
router.get('/search', getServicesBySearch);

router.post("/", auth, createService);
router.patch("/:id", auth, updateService);
router.delete("/:id", auth, deleteService);

export default router;