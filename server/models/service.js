import mongoose from "mongoose";
import activitySchema from "./activity.js";

const serviceSchema = mongoose.Schema({
    //...activitySchema.obj, // extends activitySchema

    title: { type: String },
    content: { type: String },
    creator: { type: String },
    createdAt: { type: Date, default: new Date() },

    city: { type: String },
    petSpecies: { type: String },
    type: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    location: { type: String },
    status: { type: String },

    price: { type: Number },

});

const ServiceMsg = mongoose.model('service', serviceSchema);

export default ServiceMsg;