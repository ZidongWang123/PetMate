import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  //default attributes
  address: { type: String, default: "" },
  intro: { type: String, default: "" },
  plz: { type: String, default: "" },
  avatar: { type: String, default: "" },

  // is prime user status
  isPrime: { type: Boolean, default: true }, // todo： add prime user status

  //member attributes
  subscriptionId: { type: String },
  startTime: { type: Date },
  dueTime: { type: Date },
});

export default mongoose.model("User", userSchema);
