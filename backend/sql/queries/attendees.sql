-- name: CreateAttendee :one
INSERT INTO attendees 
  (id, name, created_at, email) 
VALUES 
  ($1, $2, $3, $4) 
RETURNING *;

-- name: GetAttendeeByEmail :one
SELECT * FROM attendees
WHERE email = $1;
