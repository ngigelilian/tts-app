const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const ttsRoutes = require('./routes/ttsRoutes');
const { AUDIO_DIR } = require('./services/audioStorage');

const app = express();

// ─── Security ───
app.use(helmet());

// ─── CORS — whitelist frontend origin, never "*" in production ───
const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
app.use(
  cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// ─── Body parsing — 20 KB limit ───
app.use(express.json({ limit: '20kb' }));

// ─── Rate limiter ───
app.use('/api/', rateLimiter);

// ─── Serve generated audio files ───
app.use('/audio', express.static(AUDIO_DIR));

// ─── Health check ───
app.get('/api/v1/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── API routes (versioned) ───
app.use('/api/v1', ttsRoutes);

// MONETIZATION HOOK: Mount auth routes here.
// app.use('/api/v1/auth', authRoutes);

// MONETIZATION HOOK: Mount usage / billing routes here.
// app.use('/api/v1/usage', usageRoutes);

// ─── 404 for unmatched API routes ───
app.use('/api', (_req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found', code: 'NOT_FOUND' });
});

// ─── Global error handler (must be last) ───
app.use(errorHandler);

module.exports = app;
