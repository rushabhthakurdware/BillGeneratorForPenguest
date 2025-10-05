import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    meterNo: { type: String, required: true },
    previousReading: { type: Number, required: true },
    previousDate: { type: String, required: true },
    currentReading: { type: Number, required: true },
    currentDate: { type: String, required: true },
    pendingFee: { type: Number, default: 0 },
    units: { type: Number, required: true },
    totalBill: { type: Number, required: true },
  },
  { timestamps: true } // ✅ This will automatically add `createdAt` and `updatedAt`
);
const Bill = mongoose.model("Bill", billSchema);
export default Bill;
