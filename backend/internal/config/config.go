package config

import (
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

	cfg := &Config{
		Database:       dbUri,
		Addr:           "localhost:8080",
		SigningSecret:  signingSecret,
		ClerkSecretKey: clerkSecretKey,
	}

	return cfg, nil
}
