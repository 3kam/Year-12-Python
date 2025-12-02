const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();

// Allow JSON requests
app.use(express.json());
app.use(cors());

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// Connect database
const db = new sqlite3.Database("./fittrack.db", err => {
  if (err) console.error("DB Error:", err);
  else console.log("SQLite connected");
});

// --- TABLES ---
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS exercises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    muscle_group TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workout_name TEXT,
    weight INTEGER,
    reps INTEGER,
    sets INTEGER
  )`);
});

// --- API ROUTES ---

// Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, row) => {
      if (!row) return res.json({ error: "Invalid login" });
      res.json({ success: true, user: row });
    }
  );
});

// Get user profile
app.get("/api/user/:id", (req, res) => {
  db.get("SELECT id, email FROM users WHERE id = ?", [req.params.id], (err, row) => {
    res.json(row || {});
  });
});

// Add exercise
app.post("/api/exercises", (req, res) => {
  const { name, muscle_group } = req.body;

  db.run(
    "INSERT INTO exercises (name, muscle_group) VALUES (?, ?)",
    [name, muscle_group],
    function () {
      res.json({ success: true, id: this.lastID });
    }
  );
});

// Get all exercises
app.get("/api/exercises", (req, res) => {
  db.all("SELECT * FROM exercises", (err, rows) => res.json(rows));
});

// Add progress
app.post("/api/progress", (req, res) => {
  const { workout_name, weight, reps, sets } = req.body;

  db.run(
    "INSERT INTO progress (workout_name, weight, reps, sets) VALUES (?, ?, ?, ?)",
    [workout_name, weight, reps, sets],
    function () {
      res.json({ success: true, id: this.lastID });
    }
  );
});

// --- START SERVER ---
app.listen(3000, () => {
  console.log("FitTrack server running at http://localhost:3000");
});
