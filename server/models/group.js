import mongoose from "mongoose";

const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    intro: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    numbers: {
      type: Number,
    },
    creator: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Group", groupSchema);
