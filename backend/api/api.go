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

	//Protected routes
	mux.HandleFunc("GET /api/dashboard", middleware.LoggedIn(handler.Dashboard))

  mux.HandleFunc("GET /api/events", middleware.LoggedIn(handler.GetEvents))
  mux.HandleFunc("POST /api/events", middleware.LoggedIn(handler.PostEvent))
//  mux.HandleFunc("PUT /api/events", middleware.LoggedIn(handler.UpdateEvent))
//  mux.HandleFunc("DELETE /api/events", middleware.LoggedIn(handler.DeleteEvent))

  mux.HandleFunc("GET /api/events/{eventId}/attendees", middleware.LoggedIn(handler.GetAttendees))
  mux.HandleFunc("POST /api/events/attendees", middleware.LoggedIn(handler.PostAttendees))
//  mux.HandleFunc("PUT /api/events/attendees", middleware.LoggedIn(handler.UpdateAttendee))
//  mux.HandleFunc("DELETE /api/events/attendees", middleware.LoggedIn(handler.DeleteAttendee))

  mux.HandleFunc("GET /api/events/{eventId}/tickets", middleware.LoggedIn(handler.GetTickets))
  mux.HandleFunc("POST /api/events/tickets", middleware.LoggedIn(handler.PostTickets))
  mux.HandleFunc("PUT /api/events/tickets", middleware.LoggedIn(handler.UpdateTicket))
//  mux.HandleFunc("DELETE /api/events/tickets", middleware.LoggedIn(handler.DeleteTicket))

	//Webhook routes
	mux.HandleFunc("POST /api/webhooks", middleware.Config(cfg, handler.Webhook))

	handler := middleware.CORS(mux)
	handler = middleware.DB(queries, handler)
	handler = middleware.Logger(handler)

	server := &http.Server{
		Handler: handler,
		Addr:    cfg.Addr,
	}

	return server
}
