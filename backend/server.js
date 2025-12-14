import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import billRoutes from "./routes/BillRoutes.js";
import penguestRoutes from "./routes/PenguestRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/penguests", penguestRoutes);
// MongoDB connection
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/penguest",{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.use("/api/bills", billRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
