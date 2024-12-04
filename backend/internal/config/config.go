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
  env := os.Getenv("GO_ENV")
	if env == "" {
		env = "development"
	}

	// Load appropriate .env file based on environment
	envFile := ".env"
	if env == "development" {
		envFile = ".env.dev"
	}

	err := godotenv.Load(envFile)
	if err != nil {
		return nil, err
	}

	dbUri := os.Getenv("DB_URI")
	signingSecret := os.Getenv("SIGNING_SECRET")
	clerkSecretKey := os.Getenv("CLERK_SECRET_KEY")

  host := os.Getenv("HOST")
  port := os.Getenv("PORT")
  addr := fmt.Sprintf("%s:%s", host, port)

	cfg := &Config{
		Database:       dbUri,
		Addr:           addr,
		SigningSecret:  signingSecret,
		ClerkSecretKey: clerkSecretKey,
	}

	return cfg, nil
}
