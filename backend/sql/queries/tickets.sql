-- name: CreateTicketForEvent :one
INSERT INTO tickets 
  (id, created_at, updated_at, name, description, price, quantity, on_sale, event_id) 
VALUES 
  ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *;
