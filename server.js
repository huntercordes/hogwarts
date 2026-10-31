const express = require("express");
const pool = require("./db");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse JSON bodies

app.get("/houses", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM houses");

    console.table(result.rows);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch houses" });
  }
});

app.get("/houses/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "id must be a whole number" });
  }

  try {
    const result = await pool.query("SELECT * FROM houses WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "House not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch house" });
  }
});

app.get("/teachers", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM teachers ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch teachers" });
  }
});

app.get("/teachers/:id", async (req, res) => {
  try{ 
    const id = req.params.id;
 
    const result = await pool.query("SELECT * FROM teachers WHERE id = $1", [id]);

    if (result.rowCount === 0) 
      return res.sendStatus(404);
    


    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch teacher" });
  }
});


app.put("/teachers/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, house_id } = req.body;

    if (!name)
      return res.status(400).json({ error: "name is required" });

    const result = await pool.query(
      "UPDATE teachers SET name = $1, house_id = $2 WHERE id = $3 RETURNING *",
      [name, house_id ?? null, id]
    );

    if (result.rowCount === 0)
      return res.sendStatus(404);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Could not update teacher" });
  }
});

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS current_time");
    res.json({ connected: true, currentTime: result.rows[0].current_time });
  } catch (error) {
    res.status(503).json({ connected: false, error: "Database unavailable" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
