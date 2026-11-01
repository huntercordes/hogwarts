# Pseudokode

Hvert mønster er beskrevet fuldt én gang. Endpoints der virker på samme måde henviser tilbage.

Fælles for alle endpoints: hvis der sker en uventet fejl, fx at databasen ikke svarer, sendes 500.

## Houses

### GET /houses

1. Spørg houses-repository om alle houses
2. Send 200 med listen af houses

### GET /houses/:id

1. Hent id fra URL'en
2. Hvis id ikke er et helt tal: send 400
3. Spørg houses-repository om det house der har det id
4. Hvis intet house blev fundet: send 404
5. Send 200 med det house

## Teachers

### GET /teachers

Ligesom GET /houses, bare med teachers.

### GET /teachers/:id

Ligesom GET /houses/:id, bare med teachers.

### POST /teachers

1. Hent name og house_id fra body
2. Hvis name mangler: send 400
3. Hvis house_id er sendt med:
   - Hvis house_id ikke er et helt tal: send 400
   - Spørg houses-repository om det house findes. Hvis ikke: send 400
4. Bed teachers-repository om at oprette en ny teacher med name og house_id (eller ingen house, hvis house_id ikke blev sendt)
5. Send 201 med den nye teacher

### PUT /teachers/:id

1. Hent id fra URL'en og name og house_id fra body
2. Hvis id ikke er et helt tal: send 400
3. Hvis name mangler: send 400
4. Tjek house_id på samme måde som i POST /teachers
5. Bed teachers-repository om at opdatere den teacher der har det id
6. Hvis ingen teacher blev opdateret: send 404
7. Send 200 med den opdaterede teacher

### DELETE /teachers/:id

1. Hent id fra URL'en
2. Hvis id ikke er et helt tal: send 400
3. Bed teachers-repository om at slette den teacher der har det id
4. Hvis ingen teacher blev slettet: send 404
5. Send 204 uden indhold

Courses som teacheren havde, bliver ikke slettet. De står bare uden teacher bagefter.

## Students

Students virker som teachers, men har også et year.

### GET /students

Ligesom GET /houses, bare med students.

### GET /students/:id

Ligesom GET /houses/:id, bare med students.

### POST /students

Ligesom POST /teachers, men body har også year. Hvis year er sendt med og ikke er et helt tal: send 400.

### PUT /students/:id

Ligesom PUT /teachers/:id, men med year, som tjekkes på samme måde som i POST /students.

### DELETE /students/:id

Ligesom DELETE /teachers/:id. Studenten bliver også fjernet fra alle courses.

## Courses

### GET /courses

Ligesom GET /houses, bare med courses.

### GET /courses/:id

1. Hent id fra URL'en
2. Hvis id ikke er et helt tal: send 400
3. Bed courses-service om hele courset:
   - Servicen spørger courses-repository om courset
   - Hvis intet course blev fundet, svarer servicen med ingenting
   - Servicen spørger teachers-repository om coursets teacher
   - Servicen spørger courses-repository om alle students på courset
   - Servicen sætter teacher og students på courset
4. Hvis intet course blev fundet: send 404
5. Send 200 med courset, dets teacher og listen af students

### POST /courses

1. Hent name og teacher_id fra body
2. Hvis name mangler: send 400
3. Hvis teacher_id er sendt med:
   - Hvis teacher_id ikke er et helt tal: send 400
   - Spørg teachers-repository om den teacher findes. Hvis ikke: send 400
4. Bed courses-repository om at oprette et nyt course
5. Send 201 med det nye course

### PUT /courses/:id

Her kan man kun ændre navnet.

1. Hent id fra URL'en og name fra body
2. Hvis id ikke er et helt tal: send 400
3. Hvis name mangler: send 400
4. Bed courses-repository om at ændre navnet på det course der har det id
5. Hvis intet course blev opdateret: send 404
6. Send 200 med det opdaterede course

### PUT /courses/:id/teacher

1. Hent id fra URL'en og teacher_id fra body
2. Hvis id ikke er et helt tal: send 400
3. Hvis teacher_id mangler eller ikke er et helt tal: send 400
4. Spørg courses-repository om courset findes. Hvis ikke: send 404
5. Spørg teachers-repository om den teacher findes. Hvis ikke: send 400
6. Bed courses-repository om at sætte den nye teacher på courset
7. Send 200 med det opdaterede course

### POST /courses/:id/students

1. Hent id fra URL'en og student_id fra body
2. Hvis id ikke er et helt tal: send 400
3. Hvis student_id mangler eller ikke er et helt tal: send 400
4. Spørg courses-repository om courset findes. Hvis ikke: send 404
5. Spørg students-repository om den student findes. Hvis ikke: send 400
6. Spørg courses-repository om studenten allerede er på courset. Hvis ja: send 409
7. Bed courses-repository om at tilføje studenten til courset
8. Send 201 med forbindelsen mellem course og student

### DELETE /courses/:id/students/:studentId

1. Hent id og studentId fra URL'en
2. Hvis et af dem ikke er et helt tal: send 400
3. Bed courses-repository om at fjerne studenten fra courset
4. Hvis studenten ikke var på courset: send 404
5. Send 204 uden indhold

### DELETE /courses/:id

Ligesom DELETE /teachers/:id, bare med courses. Forbindelserne til coursets students bliver også slettet.
