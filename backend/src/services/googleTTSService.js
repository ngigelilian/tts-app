/**
 * Google Cloud Text-to-Speech fallback service.
 *
 * This module provides a compatible interface so the controller can
 * swap providers by changing a single import / env flag.
 *
 * Prerequisites:
 *   npm install @google-cloud/text-to-speech   (add when activating this provider)
 *   Set GOOGLE_APPLICATION_CREDENTIALS env to your service-account key path,
 *   or set GOOGLE_TTS_KEY to the API key for REST usage.
 */

const axios = require('axios');

const GOOGLE_TTS_URL = 'https://texttospeech.googleapis.com/v1/text:synthesize';

/**
 * Synthesize speech via Google Cloud TTS REST API.
 *
 * @param {Object} opts
 * @param {string} opts.text
 * @param {string} opts.languageCode  – e.g. "en-US"
 * @param {string} opts.voiceName     – e.g. "en-US-Wavenet-D"
 * @param {number} [opts.speed]       – Speaking rate (0.25–4.0)
 * @param {number} [opts.pitch]       – Semitones (-20.0–20.0)
 * @returns {Promise<Buffer>}         – Raw audio buffer (MP3)
 */
async function synthesize({ text, languageCode = 'en-US', voiceName, speed = 1.0, pitch = 0 }) {
  const apiKey = process.env.GOOGLE_TTS_KEY;
  if (!apiKey) {
    const err = new Error('GOOGLE_TTS_KEY is not configured');
    err.code = 'TTS_CONFIG_ERROR';
    err.statusCode = 500;
    throw err;
  }

  const requestBody = {
    input: { text },
    voice: {
      languageCode,
      name: voiceName || undefined,
    },
    audioConfig: {
      audioEncoding: 'MP3',
      speakingRate: speed,
      pitch,
    },
  };

  const { data } = await axios.post(`${GOOGLE_TTS_URL}?key=${apiKey}`, requestBody, {
    headers: { 'Content-Type': 'application/json' },
    timeout: 60_000,
  });

  // Google returns base64-encoded audio in audioContent
  return Buffer.from(data.audioContent, 'base64');
}

module.exports = { synthesize };
