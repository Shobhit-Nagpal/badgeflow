package api

import (
	"net/http"

	"github.com/Shobhit-Nagpal/badgeflow/backend/api/handler"
	"github.com/Shobhit-Nagpal/badgeflow/backend/api/middleware"
	"github.com/Shobhit-Nagpal/badgeflow/backend/internal/config"
	"github.com/Shobhit-Nagpal/badgeflow/backend/internal/database"
)

func NewServer(cfg *config.Config, queries *database.Queries) *http.Server {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /", handler.Index)
	mux.HandleFunc("GET /api", handler.ApiIndex)
	mux.HandleFunc("GET /api/healthz", handler.Health)

	//Webhook routes
	mux.HandleFunc("POST /api/webhooks", middleware.Config(cfg, handler.Webhook))

	handler := middleware.DB(queries, mux)

	server := &http.Server{
		Handler: handler,
		Addr:    cfg.Addr,
	}

	return server
}
