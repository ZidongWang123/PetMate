import mongoose from "mongoose";

const creationSchema = mongoose.Schema({
    id: { type: String },
    title: { type: String },
    content: { type: String },
    creator: { type: String },
}, { timestamps: true });


export default mongoose.model('creation', creationSchema);