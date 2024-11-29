package api

import (
	"net/http"

	"github.com/Shobhit-Nagpal/badgeflow/backend/internal/config"
	"github.com/Shobhit-Nagpal/badgeflow/backend/internal/database"
)

func NewServer(cfg *config.Config, queries *database.Queries) *http.Server {
	mux := http.NewServeMux()
	server := &http.Server{
		Handler: mux,
		Addr:    cfg.Addr,
	}

	return server
}
