import mongoose from "mongoose";
import activitySchema from "./activity.js";

const serviceSchema = mongoose.Schema({
    activity: activitySchema, // extends activitySchema

    price: { type: Number },

});

export default mongoose.model('service', serviceSchema);