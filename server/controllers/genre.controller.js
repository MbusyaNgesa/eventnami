import { Genre } from "../models/genreModel.js";

export const createGenre = async (req, res) => {
  const { genreName } = req.body;

  if (!genreName) {
    return res
      .status(404)
      .json({ success: false, message: "Genre Name missing" });
  }
  try {
    const genre = new Genre({ genreName });
    await genre.save();

    res.status(200).json({ success: true, data: genre });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed creating Genre" });
  }
};

export const getAllGenres = async (req, res) => {
  try {
    const genre = await Genre.find();

    res.status(200).json({ success: true, data: genre });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error getting all genres" });
  }
};

export const getOneGenre = async (req, res) => {
  const { id } = req.params;

  try {
    const genre = await Genre.findById(id);
    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }
    return res.status(201).json({ success: true, data: genre });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Error getting genre" });
  }
};
