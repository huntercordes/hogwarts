CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  year INTEGER,
  house_id INTEGER REFERENCES houses(id)
);

INSERT INTO students (name, year, house_id) VALUES
  ('Harry Potter', 5, 1),
  ('Hermione Granger', 5, 1),
  ('Ron Weasley', 5, 1),
  ('Cedric Diggory', 7, 2),
  ('Luna Lovegood', 4, 3),
  ('Draco Malfoy', 5, 4);
