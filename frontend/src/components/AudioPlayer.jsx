import { useRef, useState, useEffect } from 'react';

/**
 * Custom HTML5 audio player with play/pause, progress bar, volume, and time display.
 */
export default function AudioPlayer({ audioUrl }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);

  // Reset when URL changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setAudioDuration(0);
  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime || 0);
  };

  const handleLoadedMetadata = () => {
    setAudioDuration(audioRef.current?.duration || 0);
  };

  const handleEnded = () => setIsPlaying(false);

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !audioDuration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    audio.currentTime = pct * audioDuration;
  };

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const progress = audioDuration ? (currentTime / audioDuration) * 100 : 0;

  if (!audioUrl) return null;

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-4 flex items-center gap-4 shadow-sm">
      {/* Hidden native audio */}
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* Play / Pause */}
      <button
        onClick={togglePlay}
        className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-brand-600 hover:bg-brand-500 text-white transition shadow-md"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <rect x="5" y="4" width="3" height="12" rx="1" />
            <rect x="12" y="4" width="3" height="12" rx="1" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.5 4.2a.8.8 0 011.2-.7l8 5.5a.8.8 0 010 1.4l-8 5.5a.8.8 0 01-1.2-.7V4.2z" />
          </svg>
        )}
      </button>

      {/* Progress bar */}
      <div className="flex-1 cursor-pointer" onClick={handleSeek}>
        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-brand-500 transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Time */}
      <span className="flex-shrink-0 text-xs text-gray-500 font-mono w-20 text-right">
        {fmt(currentTime)} / {fmt(audioDuration)}
      </span>
    </div>
  );
}
