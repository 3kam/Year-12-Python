// GET all categories
app.get("/api/categories", (req, res) => {
  db.all("SELECT DISTINCT category FROM exercises ORDER BY category ASC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows.map(r => r.category));
  });
});

// GET exercises by category
app.get("/api/exercises", (req, res) => {
  const category = req.query.category;
  if (!category) return res.status(400).json({ error: "Missing category" });

  db.all("SELECT name FROM exercises WHERE category = ? ORDER BY name ASC", [category], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows.map(r => r.name));
  });
});
