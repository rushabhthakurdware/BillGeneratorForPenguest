// import express from "express";
// import Bill from "../models/Bill.js";

// const router = express.Router();

// router.post("/generate", async (req, res) => {
//   try {
//     const {
//       name,
//       meterNo,
//       previousReading,
//       previousDate,
//       currentReading,
//       currentDate,
//       pendingFee,
//     } = req.body;

//     const units = currentReading - previousReading;
//     const totalBill = units * 14 + pendingFee;

//     const bill = new Bill({
//       name,
//       meterNo,
//       previousReading,
//       currentReading,
//       previousDate,
//       currentDate,
//       pendingFee,
//       units,
//       totalBill,
//     });

//     await bill.save();
//     res.json(bill);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;


import express from "express";
import Bill from "../models/Bill.js";

const router = express.Router();

// Generate a new bill
router.post("/generate", async (req, res) => {
  try {
    const {
      name,
      meterNo,
      previousReading,
      previousDate,
      currentReading,
      currentDate,
      pendingFee,
    } = req.body;

    const units = currentReading - previousReading;
    const totalBill = units * 14 + pendingFee;

    const bill = new Bill({
      name,
      meterNo,
      previousReading,
      currentReading,
      previousDate,
      currentDate,
      pendingFee,
      units,
      totalBill,
    });

    await bill.save();
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ New route to get all bills
router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 }); // newest first
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a specific bill by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBill = await Bill.findByIdAndDelete(req.params.id);
    if (!deletedBill) return res.status(404).json({ message: "Bill not found" });
    res.json({ message: "Bill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
