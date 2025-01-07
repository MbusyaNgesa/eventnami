import express from "express";
import {
  createMemory,
  getAllMemories,
  getOneMemory,
  updateMemory,
} from "../../controllers/memory.controller.js";

const router = express.Router();

router.post("/memories", createMemory);
router.get("/memories", getAllMemories);
router.get("/memories/:id", getOneMemory);
router.put("/memories:id", updateMemory);

export default router;
