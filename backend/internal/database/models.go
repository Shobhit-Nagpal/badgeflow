// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0

package database

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
)

type Event struct {
	ID          uuid.UUID
	Name        string
	CreatedAt   time.Time
	ScheduledAt time.Time
	UserID      string
}

type User struct {
	ID        string
	Email     string
	CreatedAt time.Time
	ImageUrl  sql.NullString
	PlanName  string
}
