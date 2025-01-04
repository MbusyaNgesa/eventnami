import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./db/connectDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;
app.get("/", (req, res) => {
  res.send("Home route is up");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at:${PORT}`);
});
