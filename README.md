# AI Voice Generator — SaaS TTS Web App

Production-ready text-to-speech web application powered by **ElevenLabs Neural TTS** (with fallback compatibility for Google Cloud TTS, AWS Polly, and Azure Cognitive Services).

---

## Architecture

```
Client (React + Vite + TailwindCSS)
    ↕ HTTPS REST
Backend (Node.js + Express)
    ↕
External TTS API (ElevenLabs / Google / AWS / Azure)
    ↕
Temp Audio Storage (Local /tmp or S3/R2)
    ↕
Response → Audio URL
```

## Features

- **12 languages** with 2–4 neural voices each
- **Speed & pitch** control via sliders
- **Live character counter** (max 5 000 chars) with warning at 4 500
- Automatic **text chunking** for long inputs (sentence-boundary aware)
- Custom **HTML5 audio player** with seek, play/pause, time display
- **MP3 download** button (mobile-compatible)
- **15-minute TTL cleanup** for generated audio files
- **Rate limiting** — 10 req/min per IP (configurable)
- **Helmet.js** security headers + strict CORS
- **Zod** input validation (rejects unknown fields)
- Monetization-ready architecture with hook comments throughout

---

## Local Development

### Prerequisites

- Node.js ≥ 18
- An [ElevenLabs](https://elevenlabs.io) API key (free tier is fine)

### 1. Backend

```bash
cd backend
cp .env.example .env          # fill in ELEVENLABS_API_KEY at minimum
npm install
npm run dev                    # starts on http://localhost:3001
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev                    # starts on http://localhost:5173
```

The Vite dev server proxies `/api` and `/audio` requests to the backend automatically.

---

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `ELEVENLABS_API_KEY` | **Yes** | — | ElevenLabs API key |
| `GOOGLE_TTS_KEY` | No | — | Google Cloud TTS API key (fallback) |
| `AWS_ACCESS_KEY_ID` | No | — | AWS credentials for Polly/S3 |
| `AWS_SECRET_ACCESS_KEY` | No | — | AWS credentials for Polly/S3 |
| `AZURE_TTS_KEY` | No | — | Azure Cognitive Services key |
| `AZURE_TTS_REGION` | No | — | Azure region |
| `AUDIO_STORAGE` | No | `local` | `local` or `s3` |
| `AUDIO_TTL_MINUTES` | No | `15` | Minutes before audio cleanup |
| `S3_BUCKET_NAME` | No | — | S3/R2 bucket name |
| `FRONTEND_ORIGIN` | No | `http://localhost:5173` | Allowed CORS origin |
| `PORT` | No | `3001` | Backend port |
| `NODE_ENV` | No | `development` | `development` / `production` |
| `RATE_LIMIT_WINDOW_MS` | No | `60000` | Rate limit window (ms) |
| `RATE_LIMIT_MAX` | No | `10` | Max requests per window |

Frontend env (set in Vercel dashboard or `.env`):

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Full URL to the backend (e.g. `https://your-app.onrender.com`) |

---

## API Reference

### `POST /api/v1/convert`

**Request body:**
```json
{
  "text": "Hello world",
  "language": "en-US",
  "voice": "Rachel",
  "speed": 1.0,
  "pitch": 0,
  "outputFormat": "mp3_44100_128"
}
```

**Success response (200):**
```json
{
  "success": true,
  "audioUrl": "/audio/abc123.mp3",
  "duration": 1.2,
  "charactersUsed": 11
}
```

**Error response (4xx/5xx):**
```json
{
  "success": false,
  "error": "Text must not exceed 5000 characters",
  "code": "CHAR_LIMIT_EXCEEDED"
}
```

### `GET /api/v1/health`

Returns `{ "status": "ok", "timestamp": "..." }`

---

## Deployment

### Backend → Render.com

1. Connect your GitHub repo
2. **Root directory:** `backend`
3. **Build command:** `npm install`
4. **Start command:** `node server.js`
5. Add all env variables from `.env.example` in the Render dashboard
6. Enable auto-deploy on push

### Frontend → Vercel

1. Import the repo, **framework preset:** Vite
2. **Root directory:** `frontend`
3. Set `VITE_API_BASE_URL` to your Render backend URL
4. Deploy

### Docker (self-hosted)

```bash
# Create backend/.env with your keys
docker-compose up --build -d
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`

---

## Monetization Roadmap

The codebase includes `// MONETIZATION HOOK:` comments at every integration point:

| Feature | Hook Location |
|---|---|
| Free tier (1 000 chars/day) | `ttsController.js` — usage check before synthesis |
| JWT auth | `ttsRoutes.js` — auth middleware stub |
| Subscription tiers | Controller — `req.user.tier` drives char limits & voice access |
| Audio history | Controller — persist conversion logs to DB |
| Usage dashboard | `ttsRoutes.js` — `GET /api/v1/usage` endpoint |
| API key sales | Auth middleware — per-user API key validation |

---

## Project Structure

```
/tts-app
├── /backend
│   ├── /src
│   │   ├── /controllers/ttsController.js
│   │   ├── /routes/ttsRoutes.js
│   │   ├── /middleware
│   │   │   ├── rateLimiter.js
│   │   │   ├── inputValidator.js
│   │   │   └── errorHandler.js
│   │   ├── /services
│   │   │   ├── elevenlabsService.js
│   │   │   ├── googleTTSService.js
│   │   │   └── audioStorage.js
│   │   ├── /utils
│   │   │   ├── textChunker.js
│   │   │   └── ssmlBuilder.js
│   │   └── app.js
│   ├── server.js
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── /frontend
│   ├── /src
│   │   ├── /components
│   │   │   ├── TextInput.jsx
│   │   │   ├── VoiceSelector.jsx
│   │   │   ├── AudioPlayer.jsx
│   │   │   ├── DownloadButton.jsx
│   │   │   ├── SpeedPitchSliders.jsx
│   │   │   └── ConvertButton.jsx
│   │   ├── /hooks/useTTS.js
│   │   ├── /data/voiceOptions.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml
└── README.md
```
## API Key
sk_f01c65e8cad69896d7bda8bb1587e5c50be55b412a861163
---

## License

MIT
## i want to work on voices
