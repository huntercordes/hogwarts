import express from "express";
import * as teachersController from "../controllers/teachers.controller.js";

const router = express.Router();

router.get("/", teachersController.getAllTeachers);
router.get("/:id", teachersController.getTeacher);
router.post("/", teachersController.createTeacher);
router.put("/:id", teachersController.updateTeacher);
router.delete("/:id", teachersController.deleteTeacher);

export default router;
