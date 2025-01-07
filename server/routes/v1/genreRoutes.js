import express from "express";
import {
  createGenre,
  deleteGenre,
  getAllGenres,
  getOneGenre,
  updateGenre,
} from "../../controllers/genre.controller.js";

const router = express.Router();

router.post("/genre", createGenre);
router.get("/genre", getAllGenres);
router.get("/genre/:id", getOneGenre);
router.put("/genre/:id", updateGenre);
router.delete("/genre/:id", deleteGenre);

export default router;
