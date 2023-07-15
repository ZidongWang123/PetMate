import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({

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
    
    applicant: { type: Number, default: 0},
});

const ServiceMsg = mongoose.model('service', serviceSchema);

export default ServiceMsg;
