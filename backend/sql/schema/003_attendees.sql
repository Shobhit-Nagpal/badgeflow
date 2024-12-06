-- +goose Up
CREATE TABLE attendees (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  email TEXT UNIQUE NOT NULL
);

-- +goose Down
DROP TABLE attendees;
