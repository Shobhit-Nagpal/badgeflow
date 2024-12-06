-- +goose Up
CREATE TABLE event_attendees (
  id UUID PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  event_id UUID NOT NULL REFERENCES events (id) ON DELETE CASCADE,
  attendee_id UUID NOT NULL REFERENCES attendees (id) ON DELETE CASCADE,
  UNIQUE (event_id, attendee_id)
);

-- +goose Down
DROP TABLE event_attendees;
