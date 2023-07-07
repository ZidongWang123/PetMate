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
  isPrime: { type: Boolean, default: false }, // todo： add prime user status

  sex: { type: String, default: "" },
  birthday: { type: Date, default: new Date() },

  //member attributes
  subscriptionId: { type: String, default: ""  },
  startTime: { type: Date, default: new Date()  },
  dueTime: { type: Date, default: new Date()  },
});

export default mongoose.model("User", userSchema);
