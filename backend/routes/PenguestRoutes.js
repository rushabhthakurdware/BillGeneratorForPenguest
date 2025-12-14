import express from "express";
import { addPenguest, getPenguests } from "../controller/PenguestController.js";


const router = express.Router();

router.post("/", addPenguest); // Add new penguest
router.get("/", getPenguests); // Get all penguests

export default router;
