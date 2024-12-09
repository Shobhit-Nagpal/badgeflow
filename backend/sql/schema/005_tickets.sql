-- +goose Up
CREATE TABLE tickets (
  id UUID PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL NOT NULL,
  quantity INTEGER NOT NULL,
  on_sale BOOLEAN NOT NULL,
  event_id UUID NOT NULL REFERENCES events (id) ON DELETE CASCADE
);

-- +goose Down
DROP TABLE tickets;
