

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

Open the hogwarts-API-test folder in Bruno and run the requests in order. Run hogwarts.sql again to reset the data.

## Comments

Houses are commented in detail. Teachers, students and courses follow the same pattern, so only new parts are commented there.


