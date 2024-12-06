-- name: CreateEventAttendee :one
INSERT INTO event_attendees 
  (id, created_at, updated_at, event_id, attendee_id) 
VALUES 
  ($1, $2, $3, $4, $5)
RETURNING *;

-- name: GetAttendeesByEvent :many
SELECT * FROM event_attendees 
WHERE event_id = $1;
