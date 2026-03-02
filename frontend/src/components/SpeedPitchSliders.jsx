/**
 * Speed (0.5–2.0), Pitch (-20–20), and Volume (0–100) sliders with live labels.
 */
export default function SpeedPitchSliders({ speed, setSpeed, pitch, setPitch, volume, setVolume }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {/* Speed */}
      <div>
        <label htmlFor="speed" className="flex justify-between text-sm font-medium text-gray-700 mb-1">
          <span>Speed</span>
          <span className="text-brand-600 font-semibold">{speed.toFixed(1)}×</span>
        </label>
        <input
          id="speed"
          type="range"
          min="0.5"
          max="2.0"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-full accent-brand-500"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
          <span>0.5×</span>
          <span>1.0×</span>
          <span>2.0×</span>
        </div>
      </div>

      {/* Pitch */}
      <div>
        <label htmlFor="pitch" className="flex justify-between text-sm font-medium text-gray-700 mb-1">
          <span>Pitch</span>
          <span className="text-brand-600 font-semibold">{pitch >= 0 ? '+' : ''}{pitch} st</span>
        </label>
        <input
          id="pitch"
          type="range"
          min="-20"
          max="20"
          step="1"
          value={pitch}
          onChange={(e) => setPitch(parseInt(e.target.value, 10))}
          className="w-full accent-brand-500"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
          <span>-20</span>
          <span>0</span>
          <span>+20</span>
        </div>
      </div>

      {/* Volume */}
      <div>
        <label htmlFor="volume" className="flex justify-between text-sm font-medium text-gray-700 mb-1">
          <span>Volume</span>
          <span className="text-brand-600 font-semibold">{volume}%</span>
        </label>
        <input
          id="volume"
          type="range"
          min="0"
          max="100"
          step="5"
          value={volume}
          onChange={(e) => setVolume(parseInt(e.target.value, 10))}
          className="w-full accent-brand-500"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
