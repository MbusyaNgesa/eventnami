import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./db/connectDB.js";
import eventRoutes from "./routes/v1/eventRoutes.js";
import ticketRoutes from "./routes/v1/ticketRoutes.js";
import memoryRoutes from "./routes/v1/memoryRoutes.js";
import genreRoutes from "./routes/v1/genreRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

const allowedOrigins = [
  "http://localhost:3000",
  "https://eventlifyke.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

//Getting static images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/images", express.static(path.join(__dirname, "images")));

// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json()); //allows us to accept JSON data in body(what user passes)
app.use("/api/v1", eventRoutes);
app.use("/api/v1", ticketRoutes);
app.use("/api/v1", memoryRoutes);
app.use("/api/v1", genreRoutes);

app.use((req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at this:${PORT}`);
});

// app.get("/", (req, res) => {
//   res.send("Home route is up");
// });
