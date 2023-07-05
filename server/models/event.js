import mongoose from "mongoose"; 

const eventSchema = mongoose.Schema({

    currentParticipants: { type: Number },
    expectedParticipants: { type: Number },

});

export default mongoose.model('event', eventSchema);