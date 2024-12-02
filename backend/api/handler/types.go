package handler

import "time"

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
	TotalRevenue        int `json:"total_revenue"`
	EngagementRate int `json:"engagement_rate"`
}

type PostEventPayload struct {
  Name string `json:"event_name"`
  ScheduledAt time.Time `json:"schduled_at"`
}
