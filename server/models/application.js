import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
    status: { type: String},
    introduction: { type: String },

    creatorId: { type: String },
    activityId: { type: String },
    applicantId: { type: String },
});

export default mongoose.model('application', applicationSchema);