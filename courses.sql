CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  teacher_id INTEGER REFERENCES teachers(id) ON DELETE SET NULL
);

INSERT INTO courses (name, teacher_id) VALUES
  ('Potions', 4),
  ('Transfiguration', 1),
  ('Herbology', 2),
  ('Charms', 3);
