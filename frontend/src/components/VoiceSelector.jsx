import { useEffect, useState, useRef, useMemo } from 'react';
import { voiceOptions } from '../data/voiceOptions';

/**
 * Language & voice selector with search/filter and voice preview.
 * - Language dropdown + voice cards with free/pro badges
 * - Search box to filter voices by name
 * - Voice preview play button
 * - Resets voice when language changes
 */
export default function VoiceSelector({ language, setLanguage, voice, setVoice }) {
  const [search, setSearch] = useState('');
  const [previewPlaying, setPreviewPlaying] = useState(null);
  const previewAudioRef = useRef(null);

  const languages = Object.entries(voiceOptions);
  const currentVoices = voiceOptions[language]?.voices || [];

  // Filter voices by search term
  const filteredVoices = useMemo(() => {
    if (!search.trim()) return currentVoices;
    const q = search.toLowerCase();
    return currentVoices.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.gender.toLowerCase().includes(q),
    );
  }, [currentVoices, search]);

  // Reset voice when language changes
  useEffect(() => {
    setSearch('');
    if (currentVoices.length > 0) {
      setVoice(currentVoices[0].name);
    }
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  // Play a short voice preview
  const playPreview = (v) => {
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
      previewAudioRef.current = null;
    }
    if (!v.preview) return;
    if (previewPlaying === v.id) {
      setPreviewPlaying(null);
      return;
    }
    const audio = new Audio(v.preview);
    audio.onended = () => setPreviewPlaying(null);
    audio.onerror = () => setPreviewPlaying(null);
    audio.play().catch(() => setPreviewPlaying(null));
    previewAudioRef.current = audio;
    setPreviewPlaying(v.id);
  };

  return (
    <div className="space-y-4">
      {/* Language dropdown + voice search */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-800 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 outline-none transition"
          >
            {languages.map(([code, { label }]) => (
              <option key={code} value={code}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="voice-search" className="block text-sm font-medium text-gray-700 mb-1">
            Search voices
          </label>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <input
              id="voice-search"
              type="text"
              placeholder="Search by name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white pl-9 pr-3 py-2.5 text-gray-800 placeholder-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* Voice card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredVoices.map((v) => {
          const isSelected = voice === v.name;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => setVoice(v.name)}
              className={`relative flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition ${
                isSelected
                  ? 'border-brand-500 bg-brand-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-brand-300 hover:shadow-sm'
              }`}
            >
              {/* Avatar circle */}
              <span className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                v.gender === 'Female' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'
              }`}>
                {v.name.charAt(0)}
              </span>

              <div className="flex-1 min-w-0">
                <span className="block text-sm font-medium text-gray-800 truncate">{v.name}</span>
                <span className="block text-xs text-gray-500">{v.gender} &middot; Neural</span>
              </div>

              {/* Tier badge */}
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                v.tier === 'pro'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-emerald-100 text-emerald-700'
              }`}>
                {v.tier === 'pro' ? 'PRO' : 'FREE'}
              </span>

              {/* Preview button */}
              {v.preview && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); playPreview(v); }}
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-500 hover:bg-brand-50 transition"
                  aria-label={`Preview ${v.name}`}
                  title="Preview voice"
                >
                  {previewPlaying === v.id ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><rect x="5" y="4" width="3" height="12" rx="1" /><rect x="12" y="4" width="3" height="12" rx="1" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M6.5 4.2a.8.8 0 011.2-.7l8 5.5a.8.8 0 010 1.4l-8 5.5a.8.8 0 01-1.2-.7V4.2z" /></svg>
                  )}
                </button>
              )}
            </button>
          );
        })}

        {filteredVoices.length === 0 && (
          <p className="col-span-full text-sm text-gray-400 py-4 text-center">No voices match your search.</p>
        )}
      </div>
    </div>
  );
}
