import express from "express";
import housesRouter from "./routes/houses.routes.js";
import teachersRouter from "./routes/teachers.routes.js";
import studentsRouter from "./routes/students.routes.js";
import coursesRouter from "./routes/courses.routes.js";

const app = express();
const port = 3000;
// set port number to 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// lets express read json and urlencoded data from the request body

app.use("/houses", housesRouter);
app.use("/teachers", teachersRouter);
// sets up routes for houses, teachers, students, and courses
app.use("/students", studentsRouter);
app.use("/courses", coursesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
