export const generateBill = async (req, res) => {
  try {
    const {
      name,
      meterNo,
      prevReading,
      prevDate,
      currReading,
      currDate,
      pendingFee,
    } = req.body;

    // Calculate
    const units = currReading - prevReading;
    const total = units * 14 + (pendingFee || 0);

    // Bill data
    const billData = {
      name,
      meterNo,
      prevReading,
      prevDate,
      currReading,
      currDate,
      pendingFee,
      units,
      total,
    };

    // Send back to frontend
    res.json(billData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating bill" });
  }
};
