
import EventMsg from "../models/event.js";

export const getEventsByUser = async (req, res) => {
    const { id: _userId} = req.params;
    try {
        const events = await EventMsg.find({ creator: _userId }).sort({ _id: -1 })
        res.status(200).json({
          data: events
        }); // return the posts and the number of pages
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };