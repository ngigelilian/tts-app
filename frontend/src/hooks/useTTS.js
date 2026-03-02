import { useState, useCallback } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
const MAX_HISTORY = 10;

/**
 * Custom hook that manages all TTS state and API interactions.
 */
export default function useTTS() {
  // ─── Form state ───
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [voice, setVoice] = useState('');        // voice name (reset on language change)
  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(0);
  const [volume, setVolume] = useState(100);

  // ─── Result state ───
  const [audioUrl, setAudioUrl] = useState(null);
  const [duration, setDuration] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ─── History (in-memory for anonymous users) ───
  const [history, setHistory] = useState([]);

  const charCount = text.length;

  /**
   * POST to backend and handle loading / error states.
   */
  const convertToSpeech = useCallback(async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    setError(null);
    setAudioUrl(null);
    setDuration(null);

    try {
      const { data } = await axios.post(`${API_BASE}/api/v1/convert`, {
        text,
        language,
        voice,
        speed,
        pitch,
        volume,
        outputFormat: 'mp3_44100_128',
      });

      if (data.success) {
        // Build full URL for the audio file
        const url = data.audioUrl.startsWith('http')
          ? data.audioUrl
          : `${API_BASE}${data.audioUrl}`;
        setAudioUrl(url);
        setDuration(data.duration);

        // Add to history
        setHistory((prev) => [
          { text: text.slice(0, 80) + (text.length > 80 ? '…' : ''), chars: text.length, lang: language, ts: Date.now() },
          ...prev,
        ].slice(0, MAX_HISTORY));
      } else {
        setError(data.error || 'Conversion failed');
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.code === 'ERR_NETWORK') {
        setError('Network error — unable to reach the server. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [text, language, voice, speed, pitch, volume]);

  /**
   * Download the generated audio as a file.
   */
  const downloadAudio = useCallback(async () => {
    if (!audioUrl) return;

    try {
      const response = await axios.get(audioUrl, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'voice-output.mp3';
      document.body.appendChild(a);
      a.click();

      // Cleanup
      setTimeout(() => {
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 100);
    } catch {
      setError('Failed to download audio file.');
    }
  }, [audioUrl]);

  /**
   * Clear the current result so the user can generate again.
   */
  const clearResult = useCallback(() => {
    setAudioUrl(null);
    setDuration(null);
    setError(null);
  }, []);

  return {
    // State
    text, setText,
    language, setLanguage,
    voice, setVoice,
    speed, setSpeed,
    pitch, setPitch,
    volume, setVolume,
    audioUrl,
    duration,
    isLoading,
    error,
    charCount,
    history,
    // Actions
    convertToSpeech,
    downloadAudio,
    clearResult,
    setError,
  };
}
