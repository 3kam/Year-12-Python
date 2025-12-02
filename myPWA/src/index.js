import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import apiRoutes from "./routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "..", "public")));

// API router
app.use("/api", apiRoutes);

// Fallback: always return index.html for missing files
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", req.path));
});

app.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});
