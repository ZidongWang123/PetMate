import EventMsg from "../models/event.js";
import monngoose from "mongoose";

export const getEvents = async (req, res) => {
    try {
        const events = await EventMsg.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createEvent = async (req, res) => {
    const event = req.body;
    const newEvent = new EventMsg(event);
    try {
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateEvent = async (req, res) => {

}

export const deleteEvent = async (req, res) => {

}
