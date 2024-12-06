package handler

import (
	"time"

	"github.com/google/uuid"
)

type ClerkPayload struct {
	Data struct {
		CreatedAt      int `json:"created_at"`
		EmailAddresses []struct {
			EmailAddress string `json:"email_address"`
		} `json:"email_addresses"`
		ID       string `json:"id"`
		ImageURL string `json:"image_url"`
	} `json:"data"`
	Type string `json:"type"`
}

type DashboardPayload struct {
	TotalEvents    int `json:"total_events"`
	TotalAttendees int `json:"total_attendees"`
	TotalRevenue   int `json:"total_revenue"`
	EngagementRate int `json:"engagement_rate"`
}

type EventPayload struct {
	ID          uuid.UUID `json:"id"`
	Name        string    `json:"event_name"`
	ScheduledAt time.Time `json:"scheduled_at"`
	CreatedAt   time.Time `json:"created_at"`
	Location    string    `json:"location"`
	UserID      string    `json:"user_id"`
}

type PostEventPayload struct {
	Name        string    `json:"event_name"`
	ScheduledAt time.Time `json:"scheduled_at"`
	Location    string    `json:"location"`
}

type PostAttendeePayload struct {
	EventID uuid.UUID `json:"event_id"`
  Name    string    `json:"name"`
  Email    string    `json:"email"`
}

type EventAttendeePayload struct {
	ID         uuid.UUID
	CreatedAt  time.Time
	UpdatedAt  time.Time
	EventID    uuid.UUID
	AttendeeID uuid.UUID
}
