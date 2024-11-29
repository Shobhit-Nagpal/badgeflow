package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Database string
  Addr     string
}

func Load() (*Config, error) {
	err := godotenv.Load(".env.dev")
	if err != nil {
    return nil, err
	}

	dbUri := os.Getenv("DB_URI")

	cfg := &Config{
		Database: dbUri,
    Addr: "localhost:8080",
	}

	return cfg, nil
}
