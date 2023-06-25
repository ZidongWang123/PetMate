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
}

export const getServices = async (req, res) => {
    try {
        const services = await ServiceMsg.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

/**
 * it neeed to be fixed bec the filter still doesnt work
 * @param {*} req 
 * @param {*} res 
 */
export const getServicesBySearch = async (req, res) => {
    const { tags } = req.query;

    try {
        const regex = new RegExp(tags.split(',').join('|'), 'i');
        const services = await ServiceMsg.find({ $or: [{ title: regex }] });

        res.json({ data: services });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createService = async (req, res) => {
    const [city, petSpecies, type, startDate, endDate, title, location, price, content] = req.body;

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
        res.status(201).json(newService)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateService = async (req, res) => {
    const { id: _id } = req.params;
    const service = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No service with that id');

    const updatedService = await ServiceMsg.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedService);
}

export const deleteService = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No service with that id');

    await ServiceMsg.findByIdAndRemove(id);

    res.json({ message: 'Service deleted successfully' });
}