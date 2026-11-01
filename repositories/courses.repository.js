import pool from "../db.js";

export async function getAllCourses() {
  const result = await pool.query("SELECT * FROM courses ORDER BY id");
  return result.rows;
}

export async function getCourseById(id) {
  const result = await pool.query("SELECT * FROM courses WHERE id = $1", [id]);
  return result.rows[0];
}

export async function createCourse(name, teacher_id) {
  const result = await pool.query(
    "INSERT INTO courses (name, teacher_id) VALUES ($1, $2) RETURNING *",
    [name, teacher_id]
  );
  return result.rows[0];
}

export async function updateCourseName(id, name) {
  const result = await pool.query(
    "UPDATE courses SET name = $1 WHERE id = $2 RETURNING *",
    [name, id]
  );
  return result.rows[0];
}

export async function setCourseTeacher(id, teacher_id) {
  const result = await pool.query(
    "UPDATE courses SET teacher_id = $1 WHERE id = $2 RETURNING *",
    [teacher_id, id]
  );
  return result.rows[0];
}

export async function deleteCourse(id) {
  const result = await pool.query("DELETE FROM courses WHERE id = $1", [id]);
  return result.rowCount > 0;
}

export async function getStudentsInCourse(courseId) {
  const result = await pool.query(
    "SELECT students.* FROM students JOIN course_students ON course_students.student_id = students.id WHERE course_students.course_id = $1 ORDER BY students.id",
    [courseId]
  );
  return result.rows;
}

export async function isStudentInCourse(courseId, studentId) {
  const result = await pool.query(
    "SELECT * FROM course_students WHERE course_id = $1 AND student_id = $2",
    [courseId, studentId]
  );
  return result.rowCount > 0;
}

export async function addStudentToCourse(courseId, studentId) {
  const result = await pool.query(
    "INSERT INTO course_students (course_id, student_id) VALUES ($1, $2) RETURNING *",
    [courseId, studentId]
  );
  return result.rows[0];
}

export async function removeStudentFromCourse(courseId, studentId) {
  const result = await pool.query(
    "DELETE FROM course_students WHERE course_id = $1 AND student_id = $2",
    [courseId, studentId]
  );
  return result.rowCount > 0;
}
