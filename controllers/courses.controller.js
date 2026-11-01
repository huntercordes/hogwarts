import * as coursesRepository from "../repositories/courses.repository.js";
import * as teachersRepository from "../repositories/teachers.repository.js";
import * as studentsRepository from "../repositories/students.repository.js";
import * as coursesService from "../services/courses.service.js";

async function teacherExists(teacher_id) {
  if (!Number.isInteger(Number(teacher_id)))
    return false;

  const teacher = await teachersRepository.getTeacherById(teacher_id);
  return Boolean(teacher);
}

export async function getAllCourses(req, res) {
  try {
    const courses = await coursesRepository.getAllCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch courses" });
  }
}

export async function getCourse(req, res) {
  try {
    const id = req.params.id;

    if (!Number.isInteger(Number(id)))
      return res.status(400).json({ error: "id must be a whole number" });

    const course = await coursesService.getFullCourse(id);

    if (!course)
      return res.sendStatus(404);

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch course" });
  }
}

export async function createCourse(req, res) {
  try {
    const { name, teacher_id } = req.body;

    if (!name)
      return res.status(400).json({ error: "name is required" });

    if (teacher_id !== undefined && teacher_id !== null && !(await teacherExists(teacher_id)))
      return res.status(400).json({ error: "teacher does not exist" });

    const course = await coursesRepository.createCourse(name, teacher_id ?? null);

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: "Could not create course" });
  }
}

export async function updateCourse(req, res) {
  try {
    const id = req.params.id;
    const { name } = req.body;

    if (!Number.isInteger(Number(id)))
      return res.status(400).json({ error: "id must be a whole number" });

    if (!name)
      return res.status(400).json({ error: "name is required" });

    const course = await coursesRepository.updateCourseName(id, name);

    if (!course)
      return res.sendStatus(404);

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: "Could not update course" });
  }
}

export async function setCourseTeacher(req, res) {
  try {
    const id = req.params.id;
    const { teacher_id } = req.body;

    if (!Number.isInteger(Number(id)))
      return res.status(400).json({ error: "id must be a whole number" });

    if (!teacher_id)
      return res.status(400).json({ error: "teacher_id is required" });

    const existing = await coursesRepository.getCourseById(id);

    if (!existing)
      return res.sendStatus(404);

    if (!(await teacherExists(teacher_id)))
      return res.status(400).json({ error: "teacher does not exist" });

    const course = await coursesRepository.setCourseTeacher(id, teacher_id);

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: "Could not set teacher" });
  }
}

export async function deleteCourse(req, res) {
  try {
    const id = req.params.id;

    if (!Number.isInteger(Number(id)))
      return res.status(400).json({ error: "id must be a whole number" });

    const deleted = await coursesRepository.deleteCourse(id);

    if (!deleted)
      return res.sendStatus(404);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Could not delete course" });
  }
}

export async function addStudentToCourse(req, res) {
  try {
    const id = req.params.id;
    const { student_id } = req.body;

    if (!Number.isInteger(Number(id)))
      return res.status(400).json({ error: "id must be a whole number" });

    if (!student_id || !Number.isInteger(Number(student_id)))
      return res.status(400).json({ error: "student_id must be a whole number" });

    const course = await coursesRepository.getCourseById(id);

    if (!course)
      return res.sendStatus(404);

    const student = await studentsRepository.getStudentById(student_id);

    if (!student)
      return res.status(400).json({ error: "student does not exist" });

    if (await coursesRepository.isStudentInCourse(id, student_id))
      return res.status(409).json({ error: "student is already in this course" });

    const added = await coursesRepository.addStudentToCourse(id, student_id);

    res.status(201).json(added);
  } catch (error) {
    res.status(500).json({ error: "Could not add student" });
  }
}

export async function removeStudentFromCourse(req, res) {
  try {
    const id = req.params.id;
    const studentId = req.params.studentId;

    if (!Number.isInteger(Number(id)) || !Number.isInteger(Number(studentId)))
      return res.status(400).json({ error: "id must be a whole number" });

    const removed = await coursesRepository.removeStudentFromCourse(id, studentId);

    if (!removed)
      return res.sendStatus(404);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Could not remove student" });
  }
}
