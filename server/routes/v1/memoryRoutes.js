import express from "express";
import { createMemory } from "../../controllers/memory.controller.js";

const router = express.Router();

router.get("/memories", createMemory);

export default router;
