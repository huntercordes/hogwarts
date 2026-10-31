CREATE TABLE teachers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  house_id INTEGER REFERENCES houses(id)
);

INSERT INTO teachers (name, house_id) VALUES
  ('Minerva McGonagall', 1),
  ('Pomona Sprout', 2),
  ('Filius Flitwick', 3),
  ('Severus Snape', 4);
