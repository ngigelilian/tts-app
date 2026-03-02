const axios = require('axios');

const ELEVENLABS_BASE = 'https://api.elevenlabs.io/v1';

/**
 * Default voice quality settings — used unless explicitly overridden.
 */
const DEFAULT_VOICE_SETTINGS = {
  stability: 0.5,
  similarity_boost: 0.85,
  style: 0.2,
  use_speaker_boost: true,
};

const DEFAULT_MODEL_ID = 'eleven_multilingual_v2';

/**
 * Convert text to speech via ElevenLabs API.
 *
 * @param {Object} opts
 * @param {string} opts.text         – Plain text to synthesize
 * @param {string} opts.voiceId      – ElevenLabs voice ID
 * @param {string} [opts.modelId]    – Model identifier
 * @param {Object} [opts.voiceSettings] – Override default voice_settings
 * @param {string} [opts.outputFormat]  – e.g. "mp3_44100_128"
 * @returns {Promise<Buffer>}        – Raw audio buffer (MP3)
 */
async function synthesize({
  text,
  voiceId,
  modelId = DEFAULT_MODEL_ID,
  voiceSettings = {},
  outputFormat = 'mp3_44100_128',
}) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    const err = new Error('ELEVENLABS_API_KEY is not configured');
    err.code = 'TTS_CONFIG_ERROR';
    err.statusCode = 500;
    throw err;
  }

  const url = `${ELEVENLABS_BASE}/text-to-speech/${voiceId}?output_format=${outputFormat}`;

  const mergedSettings = { ...DEFAULT_VOICE_SETTINGS, ...voiceSettings };

  const response = await axios.post(
    url,
    {
      text,
      model_id: modelId,
      voice_settings: mergedSettings,
    },
    {
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      responseType: 'arraybuffer',
      timeout: 60_000, // 60 s generous timeout for long texts
    },
  );

  return Buffer.from(response.data);
}

/**
 * Fetch the list of available voices from ElevenLabs (useful for admin/debug).
 */
async function listVoices() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) throw new Error('ELEVENLABS_API_KEY is not configured');

  const { data } = await axios.get(`${ELEVENLABS_BASE}/voices`, {
    headers: { 'xi-api-key': apiKey },
    timeout: 15_000,
  });
  return data.voices;
}

module.exports = { synthesize, listVoices };
