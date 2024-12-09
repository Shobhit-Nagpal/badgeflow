package handler

import (
	"context"
	"database/sql"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"time"

	"github.com/Shobhit-Nagpal/badgeflow/backend/internal/database"
	"github.com/google/uuid"
	svix "github.com/svix/svix-webhooks/go"
)

func Health(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-9")
	io.WriteString(w, "OK")
	w.WriteHeader(http.StatusOK)
}

func Index(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-9")
	io.WriteString(w, "Welcome to BadgeFlow's backend")
	w.WriteHeader(http.StatusOK)
}

func ApiIndex(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-9")
	io.WriteString(w, "Welcome to BadgeFlow's api")
	w.WriteHeader(http.StatusOK)
}

func Webhook(w http.ResponseWriter, req *http.Request) {
	cfg := getConfig(req, "Config")
	if cfg == nil {
		respondWithError(w, http.StatusInternalServerError, "Configuration not found")
		return
	}

	db := getDB(req, "DB")
	if db == nil {
		respondWithError(w, http.StatusInternalServerError, "DB not found")
		return
	}

	payload := ClerkPayload{}

	body, err := io.ReadAll(req.Body)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Couldn't parse body")
		return
	}

	err = json.Unmarshal(body, &payload)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Couldn't unmarshal body")
		return
	}

	wh, err := svix.NewWebhook(cfg.SigningSecret)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Signing secret not found")
		return
	}
	svixID := req.Header.Get("svix-id")
	svixTimestamp := req.Header.Get("svix-timestamp")
	svixSignature := req.Header.Get("svix-signature")

	if len(svixID) == 0 || len(svixSignature) == 0 || len(svixTimestamp) == 0 {
		respondWithError(w, http.StatusInternalServerError, "Missing headers")
		return
	}

	headers := http.Header{}
	headers.Set("svix-id", svixID)
	headers.Set("svix-timestamp", svixTimestamp)
	headers.Set("svix-signature", svixSignature)

	err = wh.Verify(body, headers)

	milliseconds := int64(1654012591514)
	createdAt := time.Unix(milliseconds/1000, (milliseconds%1000)*1000000)

	params := database.CreateUserParams{
		ID:    payload.Data.ID,
		Email: payload.Data.EmailAddresses[0].EmailAddress,
		ImageUrl: sql.NullString{
			String: payload.Data.ImageURL,
			Valid:  true,
		},
		CreatedAt: createdAt,
	}

	err = db.CreateUser(context.Background(), params)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Couldn't create user")
		return
	}

	respondWithJSON(w, http.StatusOK, map[string]string{"msg": "Event successfully handled"})
}

func Dashboard(w http.ResponseWriter, req *http.Request) {

	user := getUser(req, "User")
	if user == nil {
		respondWithError(w, http.StatusInternalServerError, "User not found")
		return
	}

	db := getDB(req, "DB")
	if db == nil {
		respondWithError(w, http.StatusInternalServerError, "DB not found")
		return
	}

	payload := DashboardPayload{
		TotalEvents:    100,
		TotalAttendees: 69420,
		TotalRevenue:   86000,
		EngagementRate: 78,
	}

	respondWithJSON(w, http.StatusOK, payload)
}

func GetEvents(w http.ResponseWriter, req *http.Request) {

	user := getUser(req, "User")
	if user == nil {
		respondWithError(w, http.StatusInternalServerError, "User not found")
		return
	}

	db := getDB(req, "DB")
	if db == nil {
		respondWithError(w, http.StatusInternalServerError, "DB not found")
		return
	}

	events, err := db.GetEventsByUserID(context.Background(), user.ID)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Could not get events")
		return
	}

	response := []EventPayload{}

	for _, event := range events {
		response = append(response, EventPayload{
			ID:          event.ID,
			Name:        event.Name,
			ScheduledAt: event.ScheduledAt,
			CreatedAt:   event.CreatedAt,
			Location:    event.Location,
			UserID:      event.UserID,
		})
	}

	respondWithJSON(w, http.StatusOK, response)
}

func PostEvent(w http.ResponseWriter, req *http.Request) {
	user := getUser(req, "User")
	if user == nil {
		respondWithError(w, http.StatusInternalServerError, "User not found")
		return
	}

	db := getDB(req, "DB")
	if db == nil {
		respondWithError(w, http.StatusInternalServerError, "DB not found")
		return
	}

	payload := PostEventPayload{}

	body, err := io.ReadAll(req.Body)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Couldn't parse body")
		return
	}

	err = json.Unmarshal(body, &payload)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Couldn't unmarshal body")
		return
	}

	id := uuid.New()

	params := database.CreateEventParams{
		ID:          id,
		Name:        payload.Name,
		CreatedAt:   time.Now(),
		ScheduledAt: payload.ScheduledAt,
		Location:    payload.Location,
		UserID:      user.ID,
	}

	event, err := db.CreateEvent(context.Background(), params)
	if err != nil {
    log.Println(err)
		respondWithError(w, http.StatusInternalServerError, "Couldn't create event")
		return
	}

	response := EventPayload{
		ID:          event.ID,
		Name:        event.Name,
		ScheduledAt: event.ScheduledAt,
		CreatedAt:   event.CreatedAt,
		UserID:      event.UserID,
		Location:    event.Location,
	}

	respondWithJSON(w, http.StatusCreated, response)
}

func PostAttendees(w http.ResponseWriter, req *http.Request) {
	user := getUser(req, "User")
	if user == nil {
		respondWithError(w, http.StatusInternalServerError, "User not found")
		return
	}

	db := getDB(req, "DB")
	if db == nil {
		respondWithError(w, http.StatusInternalServerError, "DB not found")
		return
	}

	payload := PostAttendeePayload{}

	body, err := io.ReadAll(req.Body)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Couldn't parse body")
		return
	}

	err = json.Unmarshal(body, &payload)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Couldn't unmarshal body")
		return
	}

	attendee, err := db.GetAttendeeByEmail(context.Background(), payload.Email)
	if err != nil {
		if err != sql.ErrNoRows {
			respondWithError(w, http.StatusInternalServerError, "Error getting attendee by email")
			return
		}

		id := uuid.New()

		params := database.CreateAttendeeParams{
			ID:        id,
			CreatedAt: time.Now(),
			Name:      payload.Name,
			Email:     payload.Email,
		}

		attendee, err = db.CreateAttendee(req.Context(), params)
		if err != nil {
			respondWithError(w, http.StatusInternalServerError, "Couldn't create attendee")
			return
		}

	}

	id := uuid.New()
	eventAttendeeParams := database.CreateEventAttendeeParams{
		ID:         id,
		CreatedAt:  time.Now(),
		UpdatedAt:  time.Now(),
		AttendeeID: attendee.ID,
		EventID:    payload.EventID,
	}

	eventAttendee, err := db.CreateEventAttendee(context.Background(), eventAttendeeParams)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Couldn't create event attendee")
		return
	}

  response := EventAttendeePayload{
    ID: eventAttendee.ID,
    CreatedAt: eventAttendee.CreatedAt,
    UpdatedAt: eventAttendee.UpdatedAt,
    EventID: eventAttendee.EventID,
    AttendeeID: eventAttendee.AttendeeID,
  }

  respondWithJSON(w, http.StatusCreated, response)
}

func GetAttendees(w http.ResponseWriter, req *http.Request) {

	user := getUser(req, "User")
	if user == nil {
		respondWithError(w, http.StatusInternalServerError, "User not found")
		return
	}

	db := getDB(req, "DB")
	if db == nil {
		respondWithError(w, http.StatusInternalServerError, "DB not found")
		return
	}

  eventIdStr := req.PathValue("eventId")
  eventId, err := uuid.Parse(eventIdStr)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Couldn't parse event id")
		return
	}

  eventAttendees, err := db.GetAttendeesByEvent(context.Background(), eventId)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Couldn't get event attendees")
		return
	}

  response := []EventAttendeePayload{}

  for _, eventAttendee := range eventAttendees {
    response = append(response, EventAttendeePayload{
      ID: eventAttendee.ID,
      CreatedAt: eventAttendee.CreatedAt,
      UpdatedAt: eventAttendee.UpdatedAt,
      EventID: eventAttendee.EventID,
      AttendeeID: eventAttendee.AttendeeID,
      Status: eventAttendee.Status,
      Name: eventAttendee.Name,
      Email: eventAttendee.Email,
    })
  }

  respondWithJSON(w, http.StatusOK, response)
}
