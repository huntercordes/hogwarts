import * as coursesRepository from "../repositories/courses.repository.js";
import * as teachersRepository from "../repositories/teachers.repository.js";

export async function getFullCourse(id) {
  const course = await coursesRepository.getCourseById(id);

  if (!course)
    return undefined;

  if (course.teacher_id === null)
    course.teacher = null;
  else
    course.teacher = (await teachersRepository.getTeacherById(course.teacher_id)) ?? null;

  course.students = await coursesRepository.getStudentsInCourse(id);

  return course;
}
