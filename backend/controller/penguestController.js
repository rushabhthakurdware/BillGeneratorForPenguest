import Penguest from "../models/Penguest.js";

// Add new penguest
export const addPenguest = async (req, res) => {
  try {
    const { name, background, jobDetails, aadharNumber, phoneNumber } = req.body;

    // Check if penguest already exists by Aadhar
    const existing = await Penguest.findOne({ aadharNumber });
    if (existing) {
      return res.status(400).json({ message: "Penguest already exists" });
    }

    const newPenguest = await Penguest.create({
      name,
      background,
      jobDetails,
      aadharNumber,
      phoneNumber,
    });

    res.status(201).json(newPenguest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding penguest" });
  }
};

// Get all penguests
export const getPenguests = async (req, res) => {
  try {
    const penguests = await Penguest.find().sort({ createdAt: -1 });
    res.json(penguests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching penguests" });
  }
};
