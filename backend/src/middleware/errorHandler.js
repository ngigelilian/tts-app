/**
 * Global error-handling middleware.
 * Must be registered AFTER all routes.
 */
function errorHandler(err, req, res, _next) {
  // Log full error in non-production environments
  if (process.env.NODE_ENV !== 'production') {
    console.error('[ErrorHandler]', err);
  } else {
    console.error('[ErrorHandler]', err.message);
  }

  // Axios errors from upstream TTS providers
  if (err.isAxiosError) {
    const status = err.response?.status || 502;
    const upstreamMsg = err.response?.data?.detail?.message || err.response?.data?.error || 'Upstream TTS service error';

    if (status === 401) {
      return res.status(502).json({
        success: false,
        error: 'TTS service authentication failed. Please check the API key.',
        code: 'TTS_AUTH_ERROR',
      });
    }
    if (status === 429) {
      return res.status(429).json({
        success: false,
        error: 'TTS API quota exceeded. Please try again later.',
        code: 'TTS_QUOTA_EXCEEDED',
      });
    }
    return res.status(status >= 500 ? 502 : status).json({
      success: false,
      error: upstreamMsg,
      code: 'TTS_PROVIDER_ERROR',
    });
  }

  // Payload too large (express built-in)
  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      error: 'Request payload is too large (max 20 KB).',
      code: 'PAYLOAD_TOO_LARGE',
    });
  }

  // JSON parse errors
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      error: 'Invalid JSON in request body.',
      code: 'INVALID_JSON',
    });
  }

  // Fallback
  const statusCode = err.statusCode || err.status || 500;
  res.status(statusCode).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    code: err.code || 'INTERNAL_ERROR',
  });
}

module.exports = errorHandler;
