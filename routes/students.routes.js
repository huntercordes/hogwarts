import express from "express";
import * as studentsController from "../controllers/students.controller.js";

const router = express.Router();

router.get("/", studentsController.getAllStudents);
router.get("/:id", studentsController.getStudent);
router.post("/", studentsController.createStudent);
router.put("/:id", studentsController.updateStudent);
router.delete("/:id", studentsController.deleteStudent);

export default router;
