import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
    id: { type: String },
    isApproved: { type: Boolean },
    introduction: { type: String },

    userId: { type: String },
    activityId: { type: String },
});

export default mongoose.model('application', applicationSchema);