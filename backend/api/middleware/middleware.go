package middleware

import (
	"context"
	"net/http"
	"strings"

	"github.com/Shobhit-Nagpal/badgeflow/backend/internal/config"
	"github.com/Shobhit-Nagpal/badgeflow/backend/internal/database"
	"github.com/clerk/clerk-sdk-go/v2/jwt"
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
		sessionToken := strings.TrimPrefix(req.Header.Get("Authorization"), "Bearer ")

		ctx := req.Context()

		claims, err := jwt.Verify(ctx, &jwt.VerifyParams{
			Token: sessionToken,
		})

		if err != nil {
			respondWithError(w, http.StatusUnauthorized, "Unauthorized")
			return
		}

		usr, err := user.Get(ctx, claims.Subject)
		if err != nil {
			respondWithError(w, http.StatusInternalServerError, "Couldn't get user")
			return
		}

		ctx = context.WithValue(ctx, "User", usr)
		req = req.WithContext(ctx)

		next(w, req)
	}
}

func CORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		w.Header().Add("Access-Control-Allow-Origin", "*")
		w.Header().Add("Access-Control-Allow-Credentials", "true")
		w.Header().Add("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		w.Header().Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")

		if req.Method == "OPTIONS" {
			http.Error(w, "No Content", http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, req)
	})
}
