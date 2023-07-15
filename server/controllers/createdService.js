
import ServiceMsg from "../models/service.js";

export const getServicesByUser = async (req, res) => {
    const { id: _userId} = req.params;
    try {
        const services = await ServiceMsg.find({ creator: _userId }).sort({ _id: -1 })
        res.status(200).json({
          data: services
        }); // return the posts and the number of pages
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };