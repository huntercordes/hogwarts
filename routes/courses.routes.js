import express from "express";
import * as coursesController from "../controllers/courses.controller.js";

const router = express.Router();

router.get("/", coursesController.getAllCourses);
router.get("/:id", coursesController.getCourse);
router.post("/", coursesController.createCourse);
router.put("/:id", coursesController.updateCourse);
router.put("/:id/teacher", coursesController.setCourseTeacher);
router.delete("/:id", coursesController.deleteCourse);
router.post("/:id/students", coursesController.addStudentToCourse);
router.delete("/:id/students/:studentId", coursesController.removeStudentFromCourse);

export default router;
