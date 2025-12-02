import express from "express";

const router = express.Router();

// ---- SIGNUP ----
router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Missing fields" });

  return res.json({ success: true, message: "Signup OK" });
});

// ---- LOGIN ----
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Missing fields" });

  return res.json({ success: true, token: "fake-jwt-token" });
});

export default router;
