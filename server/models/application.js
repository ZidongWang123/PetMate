import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
    id: { type: String },
    isApproved: { type: Boolean },
    introduction: { type: String },

}, {timestamps: true});