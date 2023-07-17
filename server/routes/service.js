import express from "express";
import auth from "../middleware/auth.js";
import {
  getService,
  getServices,
  getServicesBySearch,
  getServicesBySorting,
  createService,
  updateService,
  deleteService,
  sendEmail

} from "../controllers/service.js";

const router = express.Router();
router.get("/", getServices);

router.get("/sorting", getServicesBySorting);
router.get("/:id", getService);

router.post("/search", getServicesBySearch);

router.post("/", auth, createService);
router.post("/sendEmail",auth, sendEmail);
router.patch("/:id", auth, updateService);
router.delete("/:id", auth, deleteService);

export default router;
