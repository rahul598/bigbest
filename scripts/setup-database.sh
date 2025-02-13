#!/bin/bash

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "Error: DATABASE_URL environment variable is not set"
    exit 1
fi

echo "Setting up database..."

# Create tables using Drizzle
echo "Creating database tables..."
npm run db:push

# Import data from backup
echo "Importing data from backup..."
psql "$DATABASE_URL" < scripts/db-backup.sql

echo "Database setup complete!"
