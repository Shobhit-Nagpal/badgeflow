-- name: CreateTicketForEvent :one
INSERT INTO tickets 
  (id, created_at, updated_at, name, description, price, quantity, on_sale, event_id) 
VALUES 
  ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *;

-- name: GetTicketsByEvent :many
SELECT * FROM tickets
WHERE event_id = $1;

-- name: UpdateTicketForEvent :one
UPDATE tickets
SET updated_at = $1, name = $2, description = $3, price = $4, quantity = $5, on_sale = $6
WHERE id = $7
RETURNING *;
