# Pseudocode

If something unexpected goes wrong in any endpoint, send 500.

## GET /houses
- ask the repository for all houses
- send 200 with the list

GET /teachers, GET /students and GET /courses are the same.

## GET /houses/:id
- get the id from the url
- if the id is not a whole number, send 400
- ask the repository for the house with that id
- if nothing is found, send 404
- otherwise send 200 with the house

GET /teachers/:id and GET /students/:id are the same.

## POST /teachers
- get name and house_id from the body
- if name is missing, send 400
- if house_id is sent but the house does not exist, send 400
- ask the repository to create the teacher
- send 201 with the new teacher

POST /students is the same, but also with year. POST /courses is the same, but with teacher_id instead of house_id.

## PUT /teachers/:id
- get the id from the url and name and house_id from the body
- if the id is not a whole number, send 400
- if name is missing, send 400
- if house_id is sent but the house does not exist, send 400
- ask the repository to update the teacher
- if nothing was updated, send 404
- otherwise send 200 with the updated teacher

PUT /students/:id is the same, but also with year. PUT /courses/:id is the same, but only changes the name.

## DELETE /teachers/:id
- get the id from the url
- if the id is not a whole number, send 400
- ask the repository to delete the teacher
- if nothing was deleted, send 404
- otherwise send 204

DELETE /students/:id and DELETE /courses/:id are the same.

## GET /courses/:id
- get the id from the url
- if the id is not a whole number, send 400
- ask the service for the course
  - the service gets the course, its teacher and its students and puts them together
- if nothing is found, send 404
- otherwise send 200 with the course, teacher and students

## PUT /courses/:id/teacher
- get the id from the url and teacher_id from the body
- if the id is not a whole number or teacher_id is missing, send 400
- if the course does not exist, send 404
- if the teacher does not exist, send 400
- ask the repository to set the new teacher on the course
- send 200 with the updated course

## POST /courses/:id/students
- get the id from the url and student_id from the body
- if the id or student_id is not a whole number, send 400
- if the course does not exist, send 404
- if the student does not exist, send 400
- if the student is already on the course, send 409
- ask the repository to add the student to the course
- send 201

## DELETE /courses/:id/students/:studentId
- get the id and studentId from the url
- if either is not a whole number, send 400
- ask the repository to remove the student from the course
- if the student was not on the course, send 404
- otherwise send 204
