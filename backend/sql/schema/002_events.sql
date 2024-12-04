-- +goose Up

CREATE TABLE events (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  scheduled_at TIMESTAMP NOT NULL,
  location TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users (id)
);

-- +goose Down
DROP TABLE events;
