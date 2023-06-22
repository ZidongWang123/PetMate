import ServiceMsg from "../models/service.js";
import monngoose from "mongoose";

export const getServices = async (req, res) => {
    try {
        const services = await ServiceMsg.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createService = async (req, res) => {
    const service = req.body;
    const newService = new ServiceMsg(service);
    try {
        await newService.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateService = async (req, res) => {
    
}

export const deleteService = async (req, res) => {

}