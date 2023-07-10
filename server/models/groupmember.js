import mongoose from "mongoose";

const Schema = mongoose.Schema;

const groupmemberSchema = new Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Group",
    },

    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Groupmember", groupmemberSchema);
