/**
 * Convert button with loading spinner.
 * Disabled when loading or when there is no text.
 */
export default function ConvertButton({ onClick, isLoading, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 active:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition focus:outline-none focus:ring-2 focus:ring-brand-400/50"
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          Generating Audio…
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 12l-4-4v8l4-4z" />
          </svg>
          Convert to Speech
        </>
      )}
    </button>
  );
}
