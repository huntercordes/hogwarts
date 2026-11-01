DROP TABLE IF EXISTS course_students;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS teachers;
DROP TABLE IF EXISTS houses;

CREATE TABLE houses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  colors TEXT,
  founder TEXT
);

CREATE TABLE teachers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  house_id INTEGER REFERENCES houses(id)
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  year INTEGER,
  house_id INTEGER REFERENCES houses(id)
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  teacher_id INTEGER REFERENCES teachers(id) ON DELETE SET NULL
);

CREATE TABLE course_students (
  course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, student_id)
);

INSERT INTO houses (name, colors, founder) VALUES
  ('Gryffindor', 'scarlet and gold', 'Godric Gryffindor'),
  ('Hufflepuff', 'yellow and black', 'Helga Hufflepuff'),
  ('Ravenclaw', 'blue and bronze', 'Rowena Ravenclaw'),
  ('Slytherin', 'green and silver', 'Salazar Slytherin');

INSERT INTO teachers (name, house_id) VALUES
  ('Minerva McGonagall', 1),
  ('Pomona Sprout', 2),
  ('Filius Flitwick', 3),
  ('Severus Snape', 4),
  ('Gilderoy Lockhart', 3);

INSERT INTO students (name, year, house_id) VALUES
  ('Harry Potter', 5, 1),
  ('Hermione Granger', 5, 1),
  ('Ron Weasley', 5, 1),
  ('Cedric Diggory', 7, 2),
  ('Luna Lovegood', 4, 3),
  ('Draco Malfoy', 5, 4),
  ('Zacharias Smith', 5, 2);

INSERT INTO courses (name, teacher_id) VALUES
  ('Potions', 4),
  ('Transfiguration', 1),
  ('Herbology', 2),
  ('Charms', 3),
  ('Defence Against the Dark Arts', 5);

INSERT INTO course_students (course_id, student_id) VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (2, 1),
  (2, 2),
  (2, 3),
  (3, 4),
  (3, 5),
  (4, 5),
  (4, 6),
  (5, 6),
  (5, 7);
