-- name: GetEventsByUserID :many
SELECT * FROM events
WHERE user_id = $1;
