package middleware

import (
	"context"
	"net/http"

	"github.com/Shobhit-Nagpal/badgeflow/backend/internal/config"
	"github.com/Shobhit-Nagpal/badgeflow/backend/internal/database"
	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/clerk/clerk-sdk-go/v2/user"
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

func LoggedIn(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		claims, ok := clerk.SessionClaimsFromContext(req.Context())
		if !ok {
			respondWithError(w, http.StatusUnauthorized, "Unauthorized")
			return
		}

		usr, err := user.Get(req.Context(), claims.Subject)
		if err != nil {
			respondWithError(w, http.StatusInternalServerError, "Couldn't get user")
			return
		}

		ctx := req.Context()
		ctx = context.WithValue(ctx, "User", usr)
		req = req.WithContext(ctx)

		next(w, req)
	}
}
