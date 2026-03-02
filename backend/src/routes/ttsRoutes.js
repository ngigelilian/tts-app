const { Router } = require('express');
const inputValidator = require('../middleware/inputValidator');
const { convert } = require('../controllers/ttsController');

const router = Router();

// MONETIZATION HOOK: Add auth middleware here for paid tiers.
// const auth = require('../middleware/auth');
// router.use(auth.optionalJwt);   // attaches req.user if token present

/**
 * POST /api/v1/convert
 * Body: { text, language, voice, speed, pitch, outputFormat }
 */
router.post('/convert', inputValidator, convert);

// MONETIZATION HOOK: Usage dashboard endpoint.
// router.get('/usage', auth.requireJwt, usageController.getUsage);

module.exports = router;
