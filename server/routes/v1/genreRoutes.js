import express from "express";
import {
  createGenre,
  getAllGenres,
  getOneGenre,
} from "../../controllers/genre.controller.js";

const router = express.Router();

router.post("/genre", createGenre);
router.get("/genre", getAllGenres);
router.get("/genre/:id", getOneGenre);

export default router;
