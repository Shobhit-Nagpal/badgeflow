// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0

package database

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
)

type Attendee struct {
	ID        uuid.UUID
	Name      string
	CreatedAt time.Time
	Email     string
}

type Event struct {
	ID          uuid.UUID
	Name        string
	CreatedAt   time.Time
	ScheduledAt time.Time
	Location    string
	UserID      string
}

type EventAttendee struct {
	ID         uuid.UUID
	CreatedAt  time.Time
	UpdatedAt  time.Time
	EventID    uuid.UUID
	AttendeeID uuid.UUID
	Status     string
}

type Ticket struct {
	ID          uuid.UUID
	CreatedAt   time.Time
	UpdatedAt   time.Time
	Name        string
	Description sql.NullString
	Price       string
	Quantity    int32
	OnSale      bool
	EventID     uuid.UUID
}

type User struct {
	ID        string
	Email     string
	CreatedAt time.Time
	ImageUrl  sql.NullString
	PlanName  string
}
