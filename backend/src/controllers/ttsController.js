const { chunkText } = require('../utils/textChunker');
const { buildSSML } = require('../utils/ssmlBuilder');
const elevenlabs = require('../services/elevenlabsService');
const { saveAudio } = require('../services/audioStorage');

// MONETIZATION HOOK: Import usageTracker middleware here to record per-user char consumption.
// const usageTracker = require('../middleware/usageTracker');

/**
 * Voice-ID lookup table — maps friendly voice names to ElevenLabs IDs.
 * Extend as needed; the frontend sends the `voice` name, not the raw ID.
 */
const VOICE_NAME_TO_ID = {
  // English (US)
  Rachel: '21m00Tcm4TlvDq8ikWAM',
  Antoni: 'ErXwobaYiN019PkySvjV',
  Domi: 'AZnzlk1XvdvUeBnXmlld',
  Bella: 'EXAVITQu4vr4xnSDxMaL',
  Josh: 'TxGEqnHWrfWFTfGW9XjX',
  Arnold: 'VR6AewLTigWG4xSOukaG',
  Adam: 'pNInz6obpgDQGcFmaJgB',
  Sam: 'yoZ06aMxZJJ28mfd3POQ',
  // Additional voices
  Elli: 'MF3mGyEYCl7XYWbV9V6O',
  Callum: 'N2lVS1w4EtoT3dr4eOWO',
  Charlie: 'IKne3meq5aSn9XLyUdCD',
  Charlotte: 'XB0fDUnXU5powFXDhCwa',
  Clyde: '2EiwWnXFnvU5JabPnv8n',
  Dave: 'CYw3kZ02Hs0563khs1Fj',
  Emily: 'LcfcDJNUP1GQjkzn1xUU',
  Ethan: 'g5CIjZEefAph4nQFvHAz',
  Fin: 'D38z5RcWu1voky8WS1ja',
  Freya: 'jsCqWAovK2LkecY7zXl4',
  George: 'JBFqnCBsd6RMkjVDRZzb',
  Gigi: 'jBpfuIE2acCO8z3wKNLl',
  Giovanni: 'zcAOhNBS3c14rBihAFp1',
  Glinda: 'z9fAnlkpzviPz146aGWa',
  Grace: 'oWAxZDx7w5VEj9dCyTzz',
  Harry: 'SOYHLrjzK2X1ezoPC6cr',
  James: 'ZQe5CZNOzWyzPSCn5a3c',
  Jeremy: 'bVMeCyTHy58xNoL34h3p',
  Jessie: 't0jbNlBVZ17f02VDIeMI',
  Joseph: 'Zlb1dXrM653N07WRdFW3',
  Liam: 'TX3LPaxmHKxFdv7VOQHJ',
  Lily: 'pFZP5JQG7iQjIQuC4Bku',
  Matilda: 'XrExE9yKIg1WjnnlVkGX',
  Michael: 'flq6f7yk4E4fJM5XTYuZ',
  Mimi: 'zrHiDhphv9ZnVXBqCLjz',
  Nicole: 'piTKgcLEGmPE4e6mEKli',
  Patrick: 'ODq5zmih8GrVes37Dizd',
  Sarah: 'EXAVITQu4vr4xnSDxMaL',
  Serena: 'pMsXgVXv3BLzUgSXRplE',
  Thomas: 'GBv7mTt0atIp3Br8iCZE',
};

/**
 * POST /api/v1/convert
 */
async function convert(req, res, next) {
  try {
    const { text, language, voice, speed, pitch, outputFormat } = req.validatedBody;

    // MONETIZATION HOOK: Check user tier character limit here.
    // e.g. if (req.user.tier === 'free' && req.user.dailyChars + text.length > 1000) { ... }

    // Resolve voice name → ElevenLabs voice ID
    const voiceId = VOICE_NAME_TO_ID[voice] || voice; // allow raw IDs as fallback

    // ── 1. Chunk long texts ──
    const chunks = chunkText(text);

    // ── 2. Synthesize each chunk ──
    const audioBuffers = [];
    for (const chunk of chunks) {
      const buffer = await elevenlabs.synthesize({
        text: chunk,
        voiceId,
        outputFormat,
        // speed & pitch are handled in voice_settings or SSML depending on provider
      });
      audioBuffers.push(buffer);
    }

    // ── 3. Concatenate audio buffers ──
    const fullAudio = Buffer.concat(audioBuffers);

    // ── 4. Save to storage ──
    const { audioUrl } = await saveAudio(fullAudio);

    // ── 5. Estimate duration (rough: MP3 128 kbps → bytes / 16000 ≈ seconds) ──
    const estimatedDuration = parseFloat((fullAudio.length / 16000).toFixed(1));

    // ── 6. Log conversion for future usage metering ──
    const conversionLog = {
      timestamp: new Date().toISOString(),
      charactersUsed: text.length,
      language,
      voice,
      duration: estimatedDuration,
      // MONETIZATION HOOK: Add userId, tier, and persist to DB/Redis.
    };
    console.log('[conversion]', JSON.stringify(conversionLog));

    // ── 7. Respond ──
    res.status(200).json({
      success: true,
      audioUrl,
      duration: estimatedDuration,
      charactersUsed: text.length,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { convert };
