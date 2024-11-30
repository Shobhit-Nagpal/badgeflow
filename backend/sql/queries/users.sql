-- name: GetUsers :many
SELECT * FROM users;

-- name: CreateUser :exec
INSERT INTO users (id, email, created_at, image_url) VALUES (
  $1,
  $2,
  $3,
  $4
  );
