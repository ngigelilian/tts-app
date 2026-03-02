import { useMemo } from 'react';

const MAX_CHARS = 5000;
const WARN_THRESHOLD = 4500;

/**
 * Textarea with a live character & word counter.
 * Counter turns red when near or over the limit.
 */
export default function TextInput({ text, setText }) {
  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const counterColor = useMemo(() => {
    if (charCount > MAX_CHARS) return 'text-red-600 font-bold';
    if (charCount > WARN_THRESHOLD) return 'text-red-500';
    return 'text-gray-400';
  }, [charCount]);

  return (
    <div className="w-full">
      <label htmlFor="tts-text" className="block text-sm font-medium text-gray-700 mb-1">
        Enter your text
      </label>
      <textarea
        id="tts-text"
        rows={7}
        maxLength={MAX_CHARS}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste the text you want to convert to speech…"
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 outline-none resize-y transition text-[15px] leading-relaxed"
      />
      <div className="mt-1 flex justify-between text-xs">
        <span className="text-gray-400">{wordCount} word{wordCount !== 1 ? 's' : ''}</span>
        <span className={counterColor}>{charCount} / {MAX_CHARS} characters</span>
      </div>
    </div>
  );
}
