-- +goose Up
CREATE TABLE users (
  id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP NOT NULL,
  image_url TEXT,
  plan_name TEXT NOT NULL DEFAULT 'free',
);

-- +goose Down
DROP TABLE users;
