package main

import (
	"database/sql"
	"log"

	"github.com/Shobhit-Nagpal/badgeflow/backend/api"
	"github.com/Shobhit-Nagpal/badgeflow/backend/internal/config"
	"github.com/Shobhit-Nagpal/badgeflow/backend/internal/database"
	"github.com/clerk/clerk-sdk-go/v2"
	_ "github.com/lib/pq"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Error loading config: %s\n", err.Error())
	}

	db, err := sql.Open("postgres", cfg.Database)
	if err != nil {
		log.Fatalf("Couldn't connect to database: %s\n", err.Error())
	}

	clerk.SetKey(cfg.ClerkSecretKey)

	dbQueries := database.New(db)

	server := api.NewServer(cfg, dbQueries)

	log.Printf("Starting up server on %s...", cfg.Addr)
	server.ListenAndServe()
}
