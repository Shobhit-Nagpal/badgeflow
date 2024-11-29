package api

import (
	"net/http"

	"github.com/Shobhit-Nagpal/badgeflow/backend/api/handler"
	"github.com/Shobhit-Nagpal/badgeflow/backend/internal/config"
	"github.com/Shobhit-Nagpal/badgeflow/backend/internal/database"
)

func NewServer(cfg *config.Config, queries *database.Queries) *http.Server {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /api/healthz", handler.Health)

	server := &http.Server{
		Handler: mux,
		Addr:    cfg.Addr,
	}

	return server
}
