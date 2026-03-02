/**
 * ssmlBuilder.js
 *
 * Wraps plain text in SSML <speak> / <prosody> tags for TTS providers
 * that support SSML (Google Cloud TTS, Azure, AWS Polly).
 * ElevenLabs uses its own API parameters for prosody, so SSML is optional there.
 */

/**
 * Escape XML special characters.
 */
function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Build an SSML string with optional prosody overrides.
 *
 * @param {string} text          – Raw text to wrap
 * @param {Object} [opts]
 * @param {number} [opts.speed]  – Speaking rate multiplier (default 1.0)
 * @param {number} [opts.pitch]  – Pitch shift in semitones (default 0)
 * @returns {string}             – Valid SSML document
 */
function buildSSML(text, { speed = 1.0, pitch = 0 } = {}) {
  const escaped = escapeXml(text);

  const needsProsody = speed !== 1.0 || pitch !== 0;

  if (!needsProsody) {
    return `<speak>${escaped}</speak>`;
  }

  // Express rate as percentage: 1.0 → "100%", 1.5 → "150%"
  const rateAttr = `${Math.round(speed * 100)}%`;
  // Express pitch as signed semitones: 0 → "+0st", -5 → "-5st"
  const pitchAttr = `${pitch >= 0 ? '+' : ''}${pitch}st`;

  return `<speak><prosody rate="${rateAttr}" pitch="${pitchAttr}">${escaped}</prosody></speak>`;
}

module.exports = { buildSSML, escapeXml };
