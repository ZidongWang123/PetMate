import mongoose from "mongoose";
import creationSchema from "./creation.js";

const activitySchema = mongoose.Schema({
    ...creationSchema.obj,

    type: { type: String },
    petSpecies: { type: String },
    location: { type: String },
    city: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    status: { type: String },

});

export default mongoose.model('activity', activitySchema);