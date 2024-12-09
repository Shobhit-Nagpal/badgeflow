-- name: CreateEventAttendee :one
INSERT INTO event_attendees 
  (id, created_at, updated_at, event_id, attendee_id) 
VALUES 
  ($1, $2, $3, $4, $5)
RETURNING *;

-- name: GetAttendeesByEvent :many
SELECT event_attendees.*, attendees.name, attendees.email 
FROM event_attendees 
INNER JOIN attendees ON event_attendees.attendee_id = attendees.id
WHERE event_id = $1;
