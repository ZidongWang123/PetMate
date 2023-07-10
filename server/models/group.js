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

    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Group", groupSchema);
