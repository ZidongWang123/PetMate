import mongoose from "mongoose"; 
import activitySchema from "./activity.js";

const eventSchema = mongoose.Schema({
    ...activitySchema.obj, // extends activitySchema

    currentParticipants: { type: Number },
    expectedParticipants: { type: Number },

});

const EventMsg = mongoose.model('event', eventSchema);

export default EventMsg;