import mongoose from "mongoose";

const Schema = mongoose.Schema;

const groupmemberSchema = new Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Group",
    },
    groupName: {
      type: String,
      required: true,
    },

    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    creatorName: {
      type: String,
      required: true,
    },

    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    memberName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Groupmember", groupmemberSchema);
