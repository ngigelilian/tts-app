/**
 * PauseInserter — inserts natural-sounding pause markers into the text.
 * Users can insert predefined pause durations at the cursor position.
 */
export default function PauseInserter({ text, setText }) {
  const pauses = [
    { label: '0.5s', marker: ' [pause:0.5s] ' },
    { label: '1s', marker: ' [pause:1s] ' },
    { label: '2s', marker: ' [pause:2s] ' },
    { label: '3s', marker: ' [pause:3s] ' },
  ];

  const insertPause = (marker) => {
    const textarea = document.getElementById('tts-text');
    if (!textarea) {
      setText((prev) => prev + marker);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = text.slice(0, start);
    const after = text.slice(end);
    const newText = before + marker + after;
    setText(newText);

    // Restore cursor position after the inserted marker
    requestAnimationFrame(() => {
      textarea.focus();
      const newPos = start + marker.length;
      textarea.setSelectionRange(newPos, newPos);
    });
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-medium text-gray-500">Insert pause:</span>
      {pauses.map((p) => (
        <button
          key={p.label}
          type="button"
          onClick={() => insertPause(p.marker)}
          className="px-2.5 py-1 text-xs font-medium rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-brand-50 hover:border-brand-300 hover:text-brand-600 transition"
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
