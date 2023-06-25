import mongoose from "mongoose";

const creationSchema = mongoose.Schema({
    title: { type: String },
    content: { type: String },
    creator: { type: String },
    createdAt: { type: Date, default: new Date() },
});


export default mongoose.model('creation', creationSchema);