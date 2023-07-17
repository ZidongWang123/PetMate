import express from "express";
import auth from "../middleware/auth.js";
import {
  getEvent,
  getEvents,
  getEventsBySearch,
  getEventsBySorting,
  createEvent,
  updateEvent,
  deleteEvent,
  incrementParticipants,
  decrementParticipants,
  sendEmailEvent
} from "../controllers/event.js";

const router = express.Router();
router.get("/", getEvents);

router.get("/sorting", getEventsBySorting);
router.get("/:id", getEvent);

router.post("/search", getEventsBySearch);

router.post("/", auth, createEvent);
router.patch("/:id", auth, updateEvent);
router.patch("/:id/increment", auth, incrementParticipants);
router.patch("/:id/decrement", auth, decrementParticipants);
//
router.delete("/:id", auth, deleteEvent);
router.post("/sendEmailEvent",auth, sendEmailEvent);

export default router;