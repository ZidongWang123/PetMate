import mongoose from "mongoose"; 
import activitySchema from "./activity.js";

const eventSchema = mongoose.Schema({
    activity: activitySchema, // extends activitySchema

    currentParticipants: { type: Number },
    expectedParticipants: { type: Number },

});

export default mongoose.model('event', eventSchema);