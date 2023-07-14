import e from "express";
import ServiceMsg from "../models/service.js";
import mongoose from "mongoose";

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
  const { page, userId } = req.query;
  try {
    let LIMIT;
    let startIndex;
    let services;
    let total;
    if (userId) {
      LIMIT = 2;
      startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
      total = await ServiceMsg.countDocuments({ creator: userId }); // count the total number of documents in the collection
      services = await ServiceMsg.find({ creator: userId })
        .sort({ _id: -1 })
        .limit(LIMIT)
        .skip(startIndex); // get the posts for the current page
      res.status(200).json({
        data: services,
        currentPageCreatedServices: Number(page),
        numberOfPagesCreatedServices: Math.ceil(total / LIMIT),
      }); // return the posts and the number of pages
    } else {
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
    }
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
      /* sortingOptions = { createdAt: 1 }; */
      console.log(sorting); // 根据与当前日期的差值进行排序
    } else if (sorting === "descending") {
      sortingOptions = { price: -1 };
      console.log(sorting);
    } else if (sorting === "ascending") {
      sortingOptions = { price: 1 };
      console.log(sorting);
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
  const { tags } = req.query;

  try {
    const regex = new RegExp(tags.split(",").join("|"), "i");
    const services = await ServiceMsg.find({ $or: [{ title: regex }] });

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
    status: null,
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
