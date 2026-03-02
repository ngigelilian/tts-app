const { z } = require('zod');

/**
 * Zod schema for POST /api/v1/convert request body.
 * Rejects unknown fields and enforces strict types.
 */
const convertSchema = z.object({
  text: z
    .string({ required_error: 'Text is required' })
    .min(1, 'Text must be at least 1 character')
    .max(5000, 'Text must not exceed 5000 characters'),
  language: z.string().default('en-US'),
  voice: z.string().default('Rachel'),
  speed: z.number().min(0.5).max(2.0).default(1.0),
  pitch: z.number().min(-20).max(20).default(0),
  volume: z.number().min(0).max(100).default(100),
  outputFormat: z.string().default('mp3_44100_128'),
}).strict();   // reject any unknown keys

/**
 * Express middleware that validates the request body against the schema.
 */
function inputValidator(req, res, next) {
  const result = convertSchema.safeParse(req.body);

  if (!result.success) {
    const firstIssue = result.error.issues[0];
    let code = 'VALIDATION_ERROR';

    if (firstIssue.path.includes('text')) {
      if (firstIssue.type === 'too_big' || firstIssue.message.includes('5000')) {
        code = 'CHAR_LIMIT_EXCEEDED';
      } else if (firstIssue.type === 'too_small' || firstIssue.message.includes('required')) {
        code = 'TEXT_REQUIRED';
      }
    }

    return res.status(400).json({
      success: false,
      error: firstIssue.message,
      code,
    });
  }

  // Attach the validated & defaulted data
  req.validatedBody = result.data;
  next();
}

module.exports = inputValidator;
