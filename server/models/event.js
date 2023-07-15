import mongoose from "mongoose"; 

const eventSchema = mongoose.Schema({

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

    
    currentParticipants: { type: Number },
    expectedParticipants: { type: Number },

});

export default mongoose.model('event', eventSchema);