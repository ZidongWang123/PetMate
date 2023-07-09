import mongoose from "mongoose";

const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    groupName: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    intro: {
      type: String,
    },
    selectedFile: {
      type: String,
    },
    creatorName: {
      type: String,
    },
    creatorId: {
      type: String,
    },
    groupcount: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Group", groupSchema);
