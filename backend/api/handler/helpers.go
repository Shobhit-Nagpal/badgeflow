package handler

import (
	"encoding/json"
	"net/http"

	"github.com/Shobhit-Nagpal/badgeflow/backend/internal/config"
	"github.com/Shobhit-Nagpal/badgeflow/backend/internal/database"
	"github.com/clerk/clerk-sdk-go/v2"
)

func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) error {
	response, err := json.Marshal(payload)
	if err != nil {
		return err
	}
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(code)
	w.Write(response)
	return nil
}

func respondWithError(w http.ResponseWriter, code int, msg string) error {
	return respondWithJSON(w, code, map[string]string{"error": msg})
}

func getConfig(r *http.Request, key string) *config.Config {
	cfg, ok := r.Context().Value(key).(*config.Config)
	if !ok {
		return nil
	}

	return cfg
}

func getDB(r *http.Request, key string) *database.Queries {
	db, ok := r.Context().Value(key).(*database.Queries)
	if !ok {
		return nil
	}

	return db
}

func getUser(r *http.Request, key string) *clerk.User {
	user, ok := r.Context().Value(key).(*clerk.User)
	if !ok {
		return nil
	}

	return user
}
