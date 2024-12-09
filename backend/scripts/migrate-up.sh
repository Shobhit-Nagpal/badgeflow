#!/bin/bash
if [ ! -f .env.dev ]; then
    echo "Error: .env.dev file not found"
    exit 1
fi

source .env.dev

if [ -z "$DB_URI" ]; then
    echo "Error: DB_URI is not set in .env.dev"
    exit 1
fi

LOCAL_DB_STRING_UNSTRIPPED=$DB_URI
IFS='?' read -ra LOCAL_DB_STRING_SPLIT <<< "$LOCAL_DB_STRING_UNSTRIPPED"
LOCAL_DB_URI=${LOCAL_DB_STRING_SPLIT[0]}

cd ./sql/schema
if ! goose postgres $LOCAL_DB_URI up; then
    echo "Error: Migration failed"
    exit 1
fi

echo "Successfully migrated up"
