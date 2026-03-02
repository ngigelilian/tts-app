/**
 * Download button — triggers browser download of the generated MP3.
 */
export default function DownloadButton({ audioUrl, downloadAudio }) {
  if (!audioUrl) return null;

  return (
    <button
      onClick={downloadAudio}
      className="inline-flex items-center gap-2 rounded-xl border-2 border-brand-600 bg-white hover:bg-brand-50 px-6 py-3 text-sm font-semibold text-brand-600 transition focus:outline-none focus:ring-2 focus:ring-brand-400/50"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" />
      </svg>
      Download MP3
    </button>
  );
}
