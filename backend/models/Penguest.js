import mongoose from "mongoose";

const penguestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  background: String,
  jobDetails: String,
  aadharNumber: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Penguest = mongoose.model("Penguest", penguestSchema);
export default Penguest;
