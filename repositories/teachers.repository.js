import pool from "../db.js";

export async function getAllTeachers() {
  const result = await pool.query("SELECT * FROM teachers ORDER BY id");
  return result.rows;
}

export async function getTeacherById(id) {
  const result = await pool.query("SELECT * FROM teachers WHERE id = $1", [id]);
  return result.rows[0];
}

export async function createTeacher(name, house_id) {
  const result = await pool.query(
    "INSERT INTO teachers (name, house_id) VALUES ($1, $2) RETURNING *",
    [name, house_id]
  );
  return result.rows[0];
}

export async function updateTeacher(id, name, house_id) {
  const result = await pool.query(
    "UPDATE teachers SET name = $1, house_id = $2 WHERE id = $3 RETURNING *",
    [name, house_id, id]
  );
  return result.rows[0];
}

export async function deleteTeacher(id) {
  const result = await pool.query("DELETE FROM teachers WHERE id = $1", [id]);
  return result.rowCount > 0;
}
