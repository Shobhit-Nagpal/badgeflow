package handler

import (
	"context"
	"database/sql"
	"encoding/json"
	"io"
	"net/http"
	"time"

	"github.com/Shobhit-Nagpal/badgeflow/backend/internal/database"
	svix "github.com/svix/svix-webhooks/go"
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
    ID: payload.Data.ID,
    Email: payload.Data.EmailAddresses[0].EmailAddress,
    ImageUrl: sql.NullString{
      String: payload.Data.ImageURL,
      Valid: true,
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
