import EventMsg from "../models/event.js";
import mongoose from "mongoose";
import requestEmail from "../middleware/sendEmailEvent.js"

export const getEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await EventMsg.findById(id);

        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getEvents = async (req, res) => {
    const { page } = req.query;
    try {
        let LIMIT;
        let startIndex;
        let events;
        let total;
        LIMIT = 6;
        startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
        total = await EventMsg.countDocuments({}); // count the total number of documents in the collection
        events = await EventMsg.find()
            .sort({ _id: -1 })
            .skip(startIndex)
            .limit(LIMIT); // get the posts for the current page
        res.status(200).json({
            data: events,
            currentPageEvent: Number(page),
            numberOfPagesEvent: Math.ceil(total / LIMIT),
        }); // return the posts and the number of pages
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getEventsBySorting = async (req, res) => {
    const { page, sorting } = req.query;
    try {
        let LIMIT;
        let startIndex;
        let events;
        let total;
        let sortingOptions = {};
        let findingOptions = {};
        const currentDate = new Date();
        if (sorting === "latest") {
            sortingOptions = { createdAt: -1 };
        } else if (sorting === "active") {
            findingOptions = {
                startDate: { $gte: currentDate },
            };
            sortingOptions = { startDate: 1 };
        } else if (sorting === "descending") {
            sortingOptions = { price: -1 };
        } else if (sorting === "ascending") {
            sortingOptions = { price: 1 };
        }
        LIMIT = 6;
        startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
        total = await EventMsg.countDocuments({}); // count the total number of documents in the collection
        events = await EventMsg.find(findingOptions)
            .sort(sortingOptions)
            .skip(startIndex)
            .limit(LIMIT); // get the posts for the current page
        res.status(200).json({
            data: events,
            currentPageEvent: Number(page),
            numberOfPagesEvent: Math.ceil(total / LIMIT),
        }); // return the posts and the number of pages
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

/**
 * it neeed to be fixed bec the filter still doesnt work
 * @param {*} req
 * @param {*} res
 */
export const getEventsBySearch = async (req, res) => {
    const [
        city,
        petSpecies,
        type,
        startDate,
        endDate,
    ] = req.body;

    try {
        const events = await EventMsg.find({
            city,
            petSpecies,
            type,
            startDate,
            endDate,
        });
        res.json({ data: events });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createEvent = async (req, res) => {
    const [
        city,
        petSpecies,
        type,
        startDate,
        endDate,
        title,
        location,
        expectedParticipants,
        content,
    ] = req.body;

    const newEvent = new EventMsg({
        title,
        content,
        creator: req.userId,
        createdAt: new Date(),
        city,
        petSpecies,
        type,
        startDate,
        endDate,
        location,
        status: null,
        currentParticipants: 0,
        expectedParticipants,
    });

    try {
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateEvent = async (req, res) => {
    const { id: _id } = req.params;
    const [
        city,
        petSpecies,
        type,
        startDate,
        endDate,
        title,
        location,
        expectedParticipants,
        content,
    ] = req.body;
    //
    const updatedEvent = {
        city,
        petSpecies,
        type,
        startDate,
        endDate,
        title,
        location,
        expectedParticipants,
        content,
    };

    try {
        const event = await EventMsg.findById(_id);
        if (!event) {
            return res.status(404).send("No event found with that id");
        }
        const updated = await EventMsg.findByIdAndUpdate(_id, updatedEvent, {
            new: true,
        });

        res.status(200).json({ message: "successfully updated" });
    } catch (error) {
        res.status(500).json({ message: "Failed to update event" });
    }
};

export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No event with that id");

    await EventMsg.findByIdAndRemove(id);

    res.json({ message: "Event deleted successfully" });
};

export const incrementParticipants = async (req, res) => {
    const { id: _id } = req.params;

    try {
        const event = await EventMsg.findById(_id);
        if (!event) {
            return res.status(404).send("No event found with that id");
        }
        const updated = await EventMsg.findByIdAndUpdate(_id, { $inc: { currentParticipants: 1 } }, {
            new: true,
        });

        res.status(200).json({ message: "successfully updated" });
    } catch (error) {
        res.status(500).json({ message: "Failed to update event" });
    }
};

export const decrementParticipants = async (req, res) => {
    const { id: _id } = req.params;

    try {
        const event = await EventMsg.findById(_id);
        if (!event) {
            return res.status(404).send("No event found with that id");
        }

        const updated = await EventMsg.findByIdAndUpdate(_id, { $inc: { currentParticipants: -1 } }, {
            new: true,
        });

        res.status(200).json({ message: "Successfully updated" });
    } catch (error) {
        res.status(500).json({ message: "Failed to update event" });
    }
};

export const sendEmail=async(req,res)=>{
    const {title,email,content}=req.body
    try {
      await requestEmail(email,title,content)
      res.status(200).json({"msg":"Sent out successfully"})
    } catch (error) {
      res.status(500).json({"msg":"Sending failed"})
    }
   
   
  }

  export const sendEmailEvent=async(req,res)=>{
    const {title,email,content}=req.body
    try {
      await requestEmail(email,title,content)
      res.status(200).json({"msg":"Sent out successfully"})
    } catch (error) {
      res.status(500).json({"msg":"Sending failed"})
    }
   
   
  }