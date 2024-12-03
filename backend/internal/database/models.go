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
  ID          uuid.UUID `json:"id"`
  Name        string    `json:"event_name"`
  CreatedAt   time.Time `json:"created_at"`
  ScheduledAt time.Time `json:"scheduled_at"`
  UserID      string    `json:"user_id"`
}

type User struct {
	ID        string
	Email     string
	CreatedAt time.Time
	ImageUrl  sql.NullString
	PlanName  string
}
