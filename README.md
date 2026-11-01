# Hogwarts Course Management System

A REST API backend with a PostgreSQL database for managing the houses, teachers, students and courses at Hogwarts. Houses can only be read. Teachers, students and courses have full CRUD. Courses also have endpoints to change the teacher and to add or remove students. There is no frontend.

## Structure

- `routes/` maps each method and URL to a controller function
- `controllers/` reads the request, validates input, asks repositories or services for data and sends the response with a status code
- `services/` handles logic that combines data from several repositories, like a course with its teacher and students
- `repositories/` is the only place with SQL, and talks to the database through `db.js`

Files are named after the data they handle and their type, for example `teachers.controller.js` and `teachers.repository.js`. All files are JavaScript modules using `import` and `export`.

## Setup

1. Run `npm install`
2. Create a PostgreSQL database called `hogwarts`
3. Open `hogwarts.sql` in a query console (pgAdmin or DataGrip) and run it. It creates all tables with example data. Running it again resets the data.
4. Copy `.env.example` to `.env` and fill in `DATABASE_URL` with your own username and password
5. Start the server with `npm run dev` (restarts on file changes) or `npm start`
6. The API runs on http://localhost:3000

## Endpoints

| Method | Route | Description |
|---|---|---|
| GET | /houses | Get all houses |
| GET | /houses/:id | Get one house |
| GET | /teachers | Get all teachers |
| GET | /teachers/:id | Get one teacher |
| POST | /teachers | Create a teacher |
| PUT | /teachers/:id | Update a teacher |
| DELETE | /teachers/:id | Delete a teacher |
| GET | /students | Get all students |
| GET | /students/:id | Get one student |
| POST | /students | Create a student |
| PUT | /students/:id | Update a student |
| DELETE | /students/:id | Delete a student |
| GET | /courses | Get all courses |
| GET | /courses/:id | Get one course with its teacher and students |
| POST | /courses | Create a course |
| PUT | /courses/:id | Change a course's name |
| PUT | /courses/:id/teacher | Change a course's teacher |
| POST | /courses/:id/students | Add a student to a course |
| DELETE | /courses/:id/students/:studentId | Remove a student from a course |
| DELETE | /courses/:id | Delete a course |

### Request bodies

- Teacher: `{ "name": "Remus Lupin", "house_id": 1 }`
- Student: `{ "name": "Neville Longbottom", "year": 5, "house_id": 1 }`
- Course: `{ "name": "Flying", "teacher_id": 1 }` (only `name` for PUT /courses/:id)
- Change teacher: `{ "teacher_id": 4 }`
- Add student: `{ "student_id": 5 }`

`name` is required. `house_id`, `year` and `teacher_id` are optional when creating, but must point to something that exists.

## Testing with Bruno

The `hogwarts-API-test` folder is a Bruno collection with a request for every endpoint.

1. Start the server and make sure you have run `hogwarts.sql`
2. In Bruno (or the Bruno extension for VS Code), open the `hogwarts-API-test` folder as a collection
3. Requests are numbered within each folder (houses, teachers, students, courses). Run them one by one, or run the whole collection with the collection runner.

The requests use the example data from `hogwarts.sql`, so nothing has to be created first. Some requests change data:

- Delete teacher deletes teacher 5, Gilderoy Lockhart
- Delete student deletes student 7, Zacharias Smith
- Delete course deletes course 5, Defence Against the Dark Arts
- Add student adds student 5, Luna Lovegood, to course 1, Potions
- Remove student removes student 3, Ron Weasley, from course 1, Potions

Run `hogwarts.sql` again to reset the data before running the collection a second time.

## Status codes

| Code | When |
|---|---|
| 200 | The request worked and data is returned |
| 201 | Something was created |
| 204 | Something was deleted or removed, nothing is returned |
| 400 | Bad input: an id that isn't a whole number, a missing name, or a house, teacher or student that doesn't exist |
| 404 | The teacher, student, course or house in the URL doesn't exist |
| 409 | The student is already on the course |
| 500 | An unexpected error, for example the database is down |
