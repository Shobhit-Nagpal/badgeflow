package middleware

import (
	"context"
	"net/http"

	"github.com/Shobhit-Nagpal/badgeflow/backend/internal/config"
	"github.com/Shobhit-Nagpal/badgeflow/backend/internal/database"
)

func DB(queries *database.Queries, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		ctx := context.WithValue(req.Context(), "DB", queries)
		next.ServeHTTP(w, req.WithContext(ctx))
	})
}

func Config(cfg *config.Config, next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		ctx := req.Context()
		ctx = context.WithValue(ctx, "Config", cfg)
		req = req.WithContext(ctx)

		next(w, req)
	}
}
