-- name: GetEventsByUserID :many
SELECT * FROM events
WHERE user_id = $1;

-- name: CreateEvent :one
INSERT INTO events (
  id, 
  name, 
  created_at, 
  scheduled_at, 
  user_id
) 
VALUES (
  $1, 
  $2, 
  $3, 
  $4, 
  $5
)
RETURNING *;
