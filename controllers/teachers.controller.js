import * as teachersRepository from "../repositories/teachers.repository.js";
import * as housesRepository from "../repositories/houses.repository.js";

async function houseExists(house_id) {
  if (house_id === undefined || house_id === null)
    return true;

  if (!Number.isInteger(Number(house_id)))
    return false;

  const house = await housesRepository.getHouseById(house_id);
  return Boolean(house);
}

export async function getAllTeachers(req, res) {
  try {
    const teachers = await teachersRepository.getAllTeachers();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch teachers" });
  }
}

export async function getTeacher(req, res) {
  try {
    const id = req.params.id;

    if (!Number.isInteger(Number(id)))
      return res.status(400).json({ error: "id must be a whole number" });

    const teacher = await teachersRepository.getTeacherById(id);

    if (!teacher)
      return res.sendStatus(404);

    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch teacher" });
  }
}

export async function createTeacher(req, res) {
  try {
    const { name, house_id } = req.body;

    if (!name)
      return res.status(400).json({ error: "name is required" });

    if (!(await houseExists(house_id)))
      return res.status(400).json({ error: "house does not exist" });

    const teacher = await teachersRepository.createTeacher(name, house_id ?? null);

    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ error: "Could not create teacher" });
  }
}

export async function updateTeacher(req, res) {
  try {
    const id = req.params.id;
    const { name, house_id } = req.body;

    if (!Number.isInteger(Number(id)))
      return res.status(400).json({ error: "id must be a whole number" });

    if (!name)
      return res.status(400).json({ error: "name is required" });

    if (!(await houseExists(house_id)))
      return res.status(400).json({ error: "house does not exist" });

    const teacher = await teachersRepository.updateTeacher(id, name, house_id ?? null);

    if (!teacher)
      return res.sendStatus(404);

    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ error: "Could not update teacher" });
  }
}

export async function deleteTeacher(req, res) {
  try {
    const id = req.params.id;

    if (!Number.isInteger(Number(id)))
      return res.status(400).json({ error: "id must be a whole number" });

    const deleted = await teachersRepository.deleteTeacher(id);

    if (!deleted)
      return res.sendStatus(404);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Could not delete teacher" });
  }
}
