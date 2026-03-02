const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// ─── Configuration ───
const STORAGE_MODE = process.env.AUDIO_STORAGE || 'local';        // "local" | "s3"
const AUDIO_DIR = path.join(__dirname, '..', '..', 'tmp', 'audio');
const TTL_MINUTES = parseInt(process.env.AUDIO_TTL_MINUTES, 10) || 15;

// Ensure the local audio directory exists
if (STORAGE_MODE === 'local') {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

/**
 * Save an audio buffer and return the public-facing path/URL.
 *
 * @param {Buffer} buffer  – MP3 audio data
 * @returns {{ fileName: string, filePath: string, audioUrl: string }}
 */
async function saveAudio(buffer) {
  if (STORAGE_MODE === 's3') {
    return saveToS3(buffer);
  }
  return saveToLocal(buffer);
}

// ─── Local Storage ───────────────────────────────────────────

function saveToLocal(buffer) {
  const fileName = `${uuidv4()}.mp3`;
  const filePath = path.join(AUDIO_DIR, fileName);
  fs.writeFileSync(filePath, buffer);

  // Schedule deletion after TTL
  setTimeout(() => {
    fs.unlink(filePath, (err) => {
      if (err && err.code !== 'ENOENT') {
        console.error(`[audioStorage] Failed to delete ${fileName}:`, err.message);
      } else {
        console.log(`[audioStorage] Cleaned up ${fileName}`);
      }
    });
  }, TTL_MINUTES * 60 * 1000);

  // The URL will be served via express.static in app.js
  const audioUrl = `/audio/${fileName}`;
  return { fileName, filePath, audioUrl };
}

// ─── S3 / Cloudflare R2 Storage (stub — activate when needed) ────

async function saveToS3(buffer) {
  // MONETIZATION HOOK: Implement S3/R2 upload for paid tiers with permanent storage.
  //
  // Example implementation:
  // const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
  // const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
  //
  // const client = new S3Client({ region: process.env.AWS_REGION });
  // const key = `audio/${uuidv4()}.mp3`;
  // await client.send(new PutObjectCommand({
  //   Bucket: process.env.S3_BUCKET_NAME,
  //   Key: key,
  //   Body: buffer,
  //   ContentType: 'audio/mpeg',
  // }));
  // const signedUrl = await getSignedUrl(client, new GetObjectCommand({ Bucket, Key: key }), { expiresIn: TTL_MINUTES * 60 });
  // return { fileName: key, filePath: key, audioUrl: signedUrl };

  throw new Error('S3 storage is not yet implemented. Set AUDIO_STORAGE=local or implement the S3 upload logic.');
}

/**
 * Resolve a fileName to its absolute local path (for streaming).
 */
function getLocalPath(fileName) {
  return path.join(AUDIO_DIR, fileName);
}

module.exports = { saveAudio, getLocalPath, AUDIO_DIR };
