import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { createServer } from "http";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import session from "express-session";
import connectPg from "connect-pg-simple";
import { setupAuth } from "./auth";

// ES Module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Trust proxy - needed for rate limiting behind a proxy
app.enable('trust proxy');

// Session configuration
const PostgresStore = connectPg(session);
app.use(session({
  store: new PostgresStore({
    conObject: {
      connectionString: process.env.DATABASE_URL,
    },
    createTableIfMissing: true,
  }),
  secret: process.env.JWT_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: app.get("env") === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: 'strict'
  },
}));

// Add CORS headers
app.use((req, res, next) => {
  const allowedOrigins = [process.env.FRONTEND_URL || '*'];
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
  });
  next();
});

(async () => {
  try {
    // Setup authentication first
    setupAuth(app);

    // Create and setup HTTP server
    const server = createServer(app);

    // Register API routes before Vite middleware
    registerRoutes(app);

    // Setup Vite or static serving after API routes
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      // Serve static files in production
      const publicPath = path.join(dirname(dirname(__filename)), "dist", "public");
      app.use(express.static(publicPath));

      // Handle SPA routing
      app.get("*", (req, res, next) => {
        if (req.path.startsWith('/api')) {
          return next();
        }
        res.sendFile(path.join(publicPath, "index.html"));
      });
    }

    // Error handling middleware - should be last
    app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
      console.error('Error:', err);
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      // Don't expose error details in production
      const error = app.get("env") === "production" 
        ? "An error occurred" 
        : message;

      if (req.path.startsWith('/api')) {
        res.status(status).json({ error });
      } else {
        res.status(status).send(error);
      }
    });

    // Start the server with port as number
    server.listen(Number(PORT), '0.0.0.0', () => {
      log(`Server started successfully on port ${PORT}`);
    });

  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();