import mongoose from "mongoose";
import activitySchema from "./activity.js";

const serviceSchema = mongoose.Schema({
    activity: activitySchema, // extends activitySchema

    price: { type: Number },

});

const ServiceMsg = mongoose.model('service', serviceSchema);

export default ServiceMsg;