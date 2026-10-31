CREATE TABLE course_students (
  course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, student_id)
);

INSERT INTO course_students (course_id, student_id) VALUES
  (1, 1),
  (1, 2),
  (1, 3);
