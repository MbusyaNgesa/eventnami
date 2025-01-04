import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./db/connectDB.js";
import eventRoutes from "./routes/v1/eventRoutes.js";
import ticketRoutes from "./routes/v1/ticketRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// app.get("/", (req, res) => {
//   res.send("Home route is up");
// });

app.use(express.json()); //allows us to accept JSON data in body(what user passes)
app.use("/api/v1", eventRoutes);
app.use("/api/v1", ticketRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at:${PORT}`);
});
