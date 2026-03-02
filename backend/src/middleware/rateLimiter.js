const rateLimit = require('express-rate-limit');

/**
 * Rate limiter middleware — 10 requests/minute per IP (configurable via env).
 * Returns a human-readable 429 response when exceeded.
 */
const rateLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 60_000,
  max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests — please wait a moment before trying again.',
    code: 'RATE_LIMIT_EXCEEDED',
  },
  keyGenerator: (req) => req.ip,
});

// MONETIZATION HOOK: Replace keyGenerator with user-id-based limiter for authenticated tiers.

module.exports = rateLimiter;
