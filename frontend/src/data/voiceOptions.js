/**
 * voiceOptions.js
 *
 * Static voice/language map for the frontend selectors.
 * IDs correspond to ElevenLabs voice IDs where available.
 * tier: "free" | "pro" — controls badge display and future gating.
 * preview: short sample URL (ElevenLabs provides preview URLs for each voice).
 */

export const voiceOptions = {
  'en-US': {
    label: 'English (US)',
    voices: [
      { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', gender: 'Female', tier: 'free', preview: 'https://api.elevenlabs.io/v1/voices/21m00Tcm4TlvDq8ikWAM/preview' },
      { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni', gender: 'Male', tier: 'free', preview: 'https://api.elevenlabs.io/v1/voices/ErXwobaYiN019PkySvjV/preview' },
      { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella', gender: 'Female', tier: 'free', preview: 'https://api.elevenlabs.io/v1/voices/EXAVITQu4vr4xnSDxMaL/preview' },
      { id: 'TxGEqnHWrfWFTfGW9XjX', name: 'Josh', gender: 'Male', tier: 'pro', preview: 'https://api.elevenlabs.io/v1/voices/TxGEqnHWrfWFTfGW9XjX/preview' },
    ],
  },
  'en-GB': {
    label: 'English (UK)',
    voices: [
      { id: 'N2lVS1w4EtoT3dr4eOWO', name: 'Callum', gender: 'Male', tier: 'free', preview: '' },
      { id: 'XB0fDUnXU5powFXDhCwa', name: 'Charlotte', gender: 'Female', tier: 'free', preview: '' },
      { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie', gender: 'Male', tier: 'pro', preview: '' },
    ],
  },
  'fr-FR': {
    label: 'French (France)',
    voices: [
      { id: 'zcAOhNBS3c14rBihAFp1', name: 'Giovanni', gender: 'Male', tier: 'free', preview: '' },
      { id: 'z9fAnlkpzviPz146aGWa', name: 'Glinda', gender: 'Female', tier: 'free', preview: '' },
    ],
  },
  'de-DE': {
    label: 'German',
    voices: [
      { id: 'VR6AewLTigWG4xSOukaG', name: 'Arnold', gender: 'Male', tier: 'free', preview: '' },
      { id: 'oWAxZDx7w5VEj9dCyTzz', name: 'Grace', gender: 'Female', tier: 'pro', preview: '' },
    ],
  },
  'es-ES': {
    label: 'Spanish (Spain)',
    voices: [
      { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', gender: 'Male', tier: 'free', preview: '' },
      { id: 'jsCqWAovK2LkecY7zXl4', name: 'Freya', gender: 'Female', tier: 'free', preview: '' },
    ],
  },
  'pt-BR': {
    label: 'Portuguese (Brazil)',
    voices: [
      { id: 'SOYHLrjzK2X1ezoPC6cr', name: 'Harry', gender: 'Male', tier: 'free', preview: '' },
      { id: 'pFZP5JQG7iQjIQuC4Bku', name: 'Lily', gender: 'Female', tier: 'pro', preview: '' },
    ],
  },
  'it-IT': {
    label: 'Italian',
    voices: [
      { id: 'flq6f7yk4E4fJM5XTYuZ', name: 'Michael', gender: 'Male', tier: 'free', preview: '' },
      { id: 'XrExE9yKIg1WjnnlVkGX', name: 'Matilda', gender: 'Female', tier: 'free', preview: '' },
    ],
  },
  'ja-JP': {
    label: 'Japanese',
    voices: [
      { id: 'Zlb1dXrM653N07WRdFW3', name: 'Joseph', gender: 'Male', tier: 'free', preview: '' },
      { id: 'piTKgcLEGmPE4e6mEKli', name: 'Nicole', gender: 'Female', tier: 'pro', preview: '' },
    ],
  },
  'ko-KR': {
    label: 'Korean',
    voices: [
      { id: 'ODq5zmih8GrVes37Dizd', name: 'Patrick', gender: 'Male', tier: 'free', preview: '' },
      { id: 'pMsXgVXv3BLzUgSXRplE', name: 'Serena', gender: 'Female', tier: 'free', preview: '' },
    ],
  },
  'sw-KE': {
    label: 'Swahili (Kenya)',
    voices: [
      { id: 'GBv7mTt0atIp3Br8iCZE', name: 'Thomas', gender: 'Male', tier: 'free', preview: '' },
      { id: 'MF3mGyEYCl7XYWbV9V6O', name: 'Elli', gender: 'Female', tier: 'free', preview: '' },
    ],
  },
  'hi-IN': {
    label: 'Hindi (India)',
    voices: [
      { id: 'g5CIjZEefAph4nQFvHAz', name: 'Ethan', gender: 'Male', tier: 'free', preview: '' },
      { id: 'jBpfuIE2acCO8z3wKNLl', name: 'Gigi', gender: 'Female', tier: 'free', preview: '' },
    ],
  },
  'ar-SA': {
    label: 'Arabic (Saudi Arabia)',
    voices: [
      { id: 'JBFqnCBsd6RMkjVDRZzb', name: 'George', gender: 'Male', tier: 'free', preview: '' },
      { id: 'LcfcDJNUP1GQjkzn1xUU', name: 'Emily', gender: 'Female', tier: 'pro', preview: '' },
    ],
  },
};

export default voiceOptions;
