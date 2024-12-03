package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Database       string
	Addr           string
	SigningSecret  string
	ClerkSecretKey string
}

func Load() (*Config, error) {
	err := godotenv.Load(".env")
	if err != nil {
		return nil, err
	}

	dbUri := os.Getenv("DB_URI")
	signingSecret := os.Getenv("SIGNING_SECRET")
	clerkSecretKey := os.Getenv("CLERK_SECRET_KEY")

  port := os.Getenv("PORT")
  addr := fmt.Sprintf("0.0.0.0:%s", port)

	cfg := &Config{
		Database:       dbUri,
		Addr:           addr,
		SigningSecret:  signingSecret,
		ClerkSecretKey: clerkSecretKey,
	}

	return cfg, nil
}
