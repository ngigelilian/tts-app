/**
 * textChunker.js
 *
 * Splits long text into chunks of ≤ maxChunkSize characters,
 * breaking only on sentence boundaries (., !, ?) — never mid-word.
 */

const DEFAULT_MAX_CHUNK = 4500;

/**
 * @param {string} text
 * @param {number} [maxChunkSize=4500]
 * @returns {string[]}
 */
function chunkText(text, maxChunkSize = DEFAULT_MAX_CHUNK) {
  if (!text || text.length <= maxChunkSize) {
    return [text];
  }

  const chunks = [];
  let remaining = text;

  while (remaining.length > 0) {
    if (remaining.length <= maxChunkSize) {
      chunks.push(remaining.trim());
      break;
    }

    // Try to find the last sentence-ending punctuation within the limit
    let splitIndex = -1;
    for (let i = maxChunkSize - 1; i >= 0; i--) {
      if (remaining[i] === '.' || remaining[i] === '!' || remaining[i] === '?') {
        splitIndex = i + 1; // include the punctuation
        break;
      }
    }

    // Fallback: split on the last space within the limit (never mid-word)
    if (splitIndex <= 0) {
      for (let i = maxChunkSize - 1; i >= 0; i--) {
        if (remaining[i] === ' ') {
          splitIndex = i;
          break;
        }
      }
    }

    // Absolute fallback: hard split at maxChunkSize
    if (splitIndex <= 0) {
      splitIndex = maxChunkSize;
    }

    chunks.push(remaining.slice(0, splitIndex).trim());
    remaining = remaining.slice(splitIndex).trim();
  }

  return chunks.filter(Boolean);
}

module.exports = { chunkText };
