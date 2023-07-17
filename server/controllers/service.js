import ServiceMsg from "../models/service.js";
import mongoose from "mongoose";
import User from "../models/user.js"
import requestEmail from "../middleware/sendEmail.js"
export const getService = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await ServiceMsg.findById(id);

    res.status(200).json(service);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getServices = async (req, res) => {
  const { page } = req.query;
  try {
    let LIMIT;
    let startIndex;
    let services;
    let total;
    LIMIT = 6;
    startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    total = await ServiceMsg.countDocuments({}); // count the total number of documents in the collection
    services = await ServiceMsg.find()
      .sort({ _id: -1 })
      .skip(startIndex)
      .limit(LIMIT); // get the posts for the current page
    res.status(200).json({
      data: services,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    }); // return the posts and the number of pages
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getServicesBySorting = async (req, res) => {
  const { page, sorting } = req.query;
  try {
    let LIMIT;
    let startIndex;
    let services;
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
    total = await ServiceMsg.countDocuments({}); // count the total number of documents in the collection
    services = await ServiceMsg.find(findingOptions)
      .sort(sortingOptions)
      .skip(startIndex)
      .limit(LIMIT); // get the posts for the current page
    res.status(200).json({
      data: services,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
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
export const getServicesBySearch = async (req, res) => {
  const [
    city,
    petSpecies,
    type,
    startDate,
    endDate,
  ] = req.body;
  try {
    const services = await ServiceMsg.find({
      city,
      petSpecies,
      type,
      startDate,
      endDate,
    });

    res.json({ data: services });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createService = async (req, res) => {
  const [
    city,
    petSpecies,
    type,
    startDate,
    endDate,
    title,
    location,
    price,
    content,
  ] = req.body;

  const newService = new ServiceMsg({
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
    status: 'active',
    price,
  });

  try {
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateService = async (req, res) => {
  const { id: _id } = req.params;
  const [
    city,
    petSpecies,
    type,
    startDate,
    endDate,
    title,
    location,
    price,
    content,
  ] = req.body;
  const updatedService = {
    city,
    petSpecies,
    type,
    startDate,
    endDate,
    title,
    location,
    price,
    content,
  };

  try {
    const service = await ServiceMsg.findById(_id);
    if (!service) {
      return res.status(404).send("No service found with that id");
    }
    const updated = await ServiceMsg.findByIdAndUpdate(_id, updatedService, {
      new: true,
    });

    res.status(200).json({ message: "successfully updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update service" });
  }
};

export const deleteService = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No service with that id");

  await ServiceMsg.findByIdAndRemove(id);

  res.json({ message: "Service deleted successfully" });
};

export const sendEmail = async (req, res) => {
  const { title, email, content } = req.body
  try {
    await requestEmail(email, title, content)
    res.status(200).json({ "msg": "Sent out successfully" })
  } catch (error) {
    res.status(500).json({ "msg": "Sending failed" })
  }


}