import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

    //default attributes
    address: { type: String, default: '' },
    intro: { type: String, default: '' },
    plz: { type: String, default: '' },
    avatar: { type: String, default: '' },

    // is prime user status
    isPrime: { type: Boolean, default: false }, // todo： add prime user status

    sex: { type: String, default: "" },
    birthday: { type: Date, default: new Date() },
      //member attributes
    subscriptionId: { type: String },
    startTime: { type: Date },
    dueTime: { type: Date },
});

export default mongoose.model("User", userSchema);
