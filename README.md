# Hogwarts Course Management System

## Setup

1. `npm install`
2. Run `hogwarts.sql` in pgAdmin on a database called `hogwarts`
3. Copy `.env.example` to `.env` and fill in your own database login
4. `npm run dev`

## Endpoints

- GET /houses - get all houses
- GET /houses/:id - get one house
- GET /teachers - get all teachers
- GET /teachers/:id - get one teacher
- POST /teachers - create teacher
- PUT /teachers/:id - update teacher
- DELETE /teachers/:id - delete teacher
- GET /students - get all students
- GET /students/:id - get one student
- POST /students - create student
- PUT /students/:id - update student
- DELETE /students/:id - delete student
- GET /courses - get all courses
- GET /courses/:id - get one course with teacher and students
- POST /courses - create course
- PUT /courses/:id - change course name
- PUT /courses/:id/teacher - change teacher
- POST /courses/:id/students - add student
- DELETE /courses/:id/students/:studentId - remove student
- DELETE /courses/:id - delete course

## Tests

Open the `hogwarts-API-test` folder as a collection in Bruno and run the requests in order. Run `hogwarts.sql` again to reset the data before running them a second time.
