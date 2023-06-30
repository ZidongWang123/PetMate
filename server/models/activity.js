import mongoose from "mongoose";
import creationSchema from "./creation.js";

const activitySchema = mongoose.Schema({
    ...creationSchema.obj,

    city: { type: String },
    petSpecies: { type: String },
    type: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    location: { type: String },
    status: { type: String },

});

export default mongoose.model('activity', activitySchema);