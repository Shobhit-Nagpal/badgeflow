-- +goose Up
CREATE TABLE event_attendees (
  id UUID PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  event_id UUID NOT NULL REFERENCES events (id) ON DELETE CASCADE,
  attendee_id UUID NOT NULL REFERENCES attendees (id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'confirmed',

  UNIQUE (event_id, attendee_id),
  CHECK (status IN ('confirmed', 'pending', 'cancelled', 'waitlisted'))
);

-- +goose Down
DROP TABLE event_attendees;
