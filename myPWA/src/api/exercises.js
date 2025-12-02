export async function onRequestGet(context) {
  const db = context.env.DB; // your D1 binding

  const result = await db.prepare(`
    SELECT category, name 
    FROM exercises
    ORDER BY category, name
  `).all();

  // Group by category
  const grouped = {};
  for (const row of result.results) {
    if (!grouped[row.category]) grouped[row.category] = [];
    grouped[row.category].push(row.name);
  }

  return new Response(JSON.stringify(grouped), {
    headers: { "Content-Type": "application/json" }
  });
}
