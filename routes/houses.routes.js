import express from "express";
import * as housesController from "../controllers/houses.controller.js";
// import the houses controller functions to handle the requests

const router = express.Router();
// create a new router instance for handling house-related routes

router.get("/", housesController.getAllHouses);
router.get("/:id", housesController.getHouse);

export default router;
