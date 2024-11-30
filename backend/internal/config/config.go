package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Database string
  Addr     string
  SigningSecret string
}

func Load() (*Config, error) {
	err := godotenv.Load(".env.dev")
	if err != nil {
    return nil, err
	}

	dbUri := os.Getenv("DB_URI")
  signingSecret := os.Getenv("SIGNING_SECRET")

	cfg := &Config{
		Database: dbUri,
    Addr: "localhost:8080",
    SigningSecret: signingSecret,
	}

	return cfg, nil
}
