import * as studentsRepository from "../repositories/students.repository.js";
import * as housesRepository from "../repositories/houses.repository.js";

async function houseExists(house_id) {
  if (house_id === undefined || house_id === null)
    return true;

  if (!Number.isInteger(Number(house_id)))
    return false;

  const house = await housesRepository.getHouseById(house_id);
  return Boolean(house);
}

function yearIsValid(year) {
  if (year === undefined || year === null)
    return true;

  return Number.isInteger(Number(year));
}

export async function getAllStudents(req, res) {
  try {
    const students = await studentsRepository.getAllStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch students" });
  }
}

export async function getStudent(req, res) {
  try {
    const id = req.params.id;

    if (!Number.isInteger(Number(id)))
      return res.status(400).json({ error: "id must be a whole number" });

    const student = await studentsRepository.getStudentById(id);

    if (!student)
      return res.sendStatus(404);

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch student" });
  }
}

export async function createStudent(req, res) {
  try {
    const { name, year, house_id } = req.body;

    if (!name)
      return res.status(400).json({ error: "name is required" });

    if (!yearIsValid(year))
      return res.status(400).json({ error: "year must be a whole number" });

    if (!(await houseExists(house_id)))
      return res.status(400).json({ error: "house does not exist" });

    const student = await studentsRepository.createStudent(name, year ?? null, house_id ?? null);

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: "Could not create student" });
  }
}

export async function updateStudent(req, res) {
  try {
    const id = req.params.id;
    const { name, year, house_id } = req.body;

    if (!Number.isInteger(Number(id)))
      return res.status(400).json({ error: "id must be a whole number" });

    if (!name)
      return res.status(400).json({ error: "name is required" });

    if (!yearIsValid(year))
      return res.status(400).json({ error: "year must be a whole number" });

    if (!(await houseExists(house_id)))
      return res.status(400).json({ error: "house does not exist" });

    const student = await studentsRepository.updateStudent(id, name, year ?? null, house_id ?? null);

    if (!student)
      return res.sendStatus(404);

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: "Could not update student" });
  }
}

export async function deleteStudent(req, res) {
  try {
    const id = req.params.id;

    if (!Number.isInteger(Number(id)))
      return res.status(400).json({ error: "id must be a whole number" });

    const deleted = await studentsRepository.deleteStudent(id);

    if (!deleted)
      return res.sendStatus(404);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Could not delete student" });
  }
}
