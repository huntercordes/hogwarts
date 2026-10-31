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

app.post("/teachers", async (req, res) => {
  try {
    const { name, house_id } = req.body;

    if (!name)
      return res.status(400).json({ error: "name is required" });

    const result = await pool.query(
      "INSERT INTO teachers (name, house_id) VALUES ($1, $2) RETURNING *",
      [name, house_id ?? null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Could not create teacher" });
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

app.delete("/teachers/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query("DELETE FROM teachers WHERE id = $1", [id]);

    if (result.rowCount === 0)
      return res.sendStatus(404);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Could not delete teacher" });
  }
});

app.get("/students", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM students ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch students" });
  }
});

app.get("/students/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query("SELECT * FROM students WHERE id = $1", [id]);

    if (result.rowCount === 0)
      return res.sendStatus(404);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch student" });
  }
});

app.post("/students", async (req, res) => {
  try {
    const { name, year, house_id } = req.body;

    if (!name)
      return res.status(400).json({ error: "name is required" });

    const result = await pool.query(
      "INSERT INTO students (name, year, house_id) VALUES ($1, $2, $3) RETURNING *",
      [name, year ?? null, house_id ?? null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Could not create student" });
  }
});

app.put("/students/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, year, house_id } = req.body;

    if (!name)
      return res.status(400).json({ error: "name is required" });

    const result = await pool.query(
      "UPDATE students SET name = $1, year = $2, house_id = $3 WHERE id = $4 RETURNING *",
      [name, year ?? null, house_id ?? null, id]
    );

    if (result.rowCount === 0)
      return res.sendStatus(404);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Could not update student" });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query("DELETE FROM students WHERE id = $1", [id]);

    if (result.rowCount === 0)
      return res.sendStatus(404);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Could not delete student" });
  }
});

app.get("/courses", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM courses ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch courses" });
  }
});

app.get("/courses/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query("SELECT * FROM courses WHERE id = $1", [id]);

    if (result.rowCount === 0)
      return res.sendStatus(404);

    const course = result.rows[0];

    const teacher = await pool.query("SELECT * FROM teachers WHERE id = $1", [course.teacher_id]);
    course.teacher = teacher.rows[0] ?? null;

    const students = await pool.query(
      "SELECT students.* FROM students JOIN course_students ON course_students.student_id = students.id WHERE course_students.course_id = $1 ORDER BY students.id",
      [id]
    );
    course.students = students.rows;

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch course" });
  }
});

app.post("/courses", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name)
      return res.status(400).json({ error: "name is required" });

    const result = await pool.query(
      "INSERT INTO courses (name) VALUES ($1) RETURNING *",
      [name]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Could not create course" });
  }
});

app.put("/courses/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;

    if (!name)
      return res.status(400).json({ error: "name is required" });

    const result = await pool.query(
      "UPDATE courses SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );

    if (result.rowCount === 0)
      return res.sendStatus(404);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Could not update course" });
  }
});

app.put("/courses/:id/teacher", async (req, res) => {
  try {
    const id = req.params.id;
    const { teacher_id } = req.body;

    if (!teacher_id)
      return res.status(400).json({ error: "teacher_id is required" });

    const result = await pool.query(
      "UPDATE courses SET teacher_id = $1 WHERE id = $2 RETURNING *",
      [teacher_id, id]
    );

    if (result.rowCount === 0)
      return res.sendStatus(404);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Could not set teacher" });
  }
});

app.post("/courses/:id/students", async (req, res) => {
  try {
    const id = req.params.id;
    const { student_id } = req.body;

    if (!student_id)
      return res.status(400).json({ error: "student_id is required" });

    const result = await pool.query(
      "INSERT INTO course_students (course_id, student_id) VALUES ($1, $2) RETURNING *",
      [id, student_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Could not add student" });
  }
});

app.delete("/courses/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query("DELETE FROM courses WHERE id = $1", [id]);

    if (result.rowCount === 0)
      return res.sendStatus(404);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Could not delete course" });
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
