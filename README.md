# Database
DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[dbname]

# Authentication
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-token-secret

# OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id 
FACEBOOK_APP_SECRET=your-facebook-app-secret

# AWS (for OCR)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key

# Stripe (for payments)
STRIPE_PUBLIC_KEY=your-stripe-public-key
STRIPE_SECRET_KEY=your-stripe-secret-key

# Optional
PORT=5000 # Default is 5000
FRONTEND_URL=https://your-frontend-url # For CORS in production
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

The application will be available at `http://your-domain:PORT`.

## Database Setup

For a new deployment, follow these steps:

1. Set up your environment variables, especially `DATABASE_URL`

2. Run the automated setup script:
```bash
chmod +x scripts/setup-database.sh
./scripts/setup-database.sh
```

This will:
- Create all necessary database tables
- Import initial data if needed

Or manually:
```bash
# Create tables only
npm run db:push

# Import data (if needed)
psql $DATABASE_URL < scripts/db-backup.sql