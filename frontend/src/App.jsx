import { useState } from 'react';
import TextInput from './components/TextInput';
import VoiceSelector from './components/VoiceSelector';
import SpeedPitchSliders from './components/SpeedPitchSliders';
import ConvertButton from './components/ConvertButton';
import AudioPlayer from './components/AudioPlayer';
import DownloadButton from './components/DownloadButton';
import PauseInserter from './components/PauseInserter';
import useTTS from './hooks/useTTS';
import { voiceOptions } from './data/voiceOptions';

/* ─── FAQ data ─── */
const faqs = [
  { q: 'Is this text-to-speech tool free?', a: 'Yes! You can convert up to 5,000 characters per request for free. No sign-up required.' },
  { q: 'What audio formats are supported?', a: 'Generated audio is delivered as high-quality MP3 (44.1 kHz, 128 kbps). WAV export is coming soon.' },
  { q: 'How many languages are available?', a: 'We currently support 12 languages with 2–4 neural voices each, and we\'re adding more regularly.' },
  { q: 'Can I use the generated audio commercially?', a: 'Check the terms of your TTS provider (e.g. ElevenLabs). Most allow commercial use on paid plans.' },
  { q: 'Is there an API for developers?', a: 'Yes — our REST API is available for integration. See the API & Pricing section for details.' },
  { q: 'How does voice preview work?', a: 'Click the play icon on any voice card to hear a short sample before converting your full text.' },
];

/* ─── Features data ─── */
const features = [
  { icon: '🎙️', title: 'Neural AI Voices', desc: 'Powered by ElevenLabs multilingual v2 for ultra-realistic, human-sounding speech.' },
  { icon: '🌍', title: '12+ Languages', desc: 'English, Spanish, French, German, Japanese, Korean, Hindi, Arabic, and more.' },
  { icon: '⚡', title: 'Instant Conversion', desc: 'Generate audio in seconds. No queuing, no waiting — results appear instantly.' },
  { icon: '🎛️', title: 'Full Control', desc: 'Adjust speed, pitch, and volume. Insert pauses for natural-sounding breaks.' },
  { icon: '📥', title: 'Easy Download', desc: 'Download your audio as MP3 with one click. Works on desktop and mobile browsers.' },
  { icon: '🔒', title: 'Private & Secure', desc: 'Your text is never stored. Audio files are automatically deleted after 15 minutes.' },
];

export default function App() {
  const {
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
    convertToSpeech,
    downloadAudio,
    clearResult,
  } = useTTS();

  const [openFaq, setOpenFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ═══════════ HEADER ═══════════ */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="text-2xl">🔊</span>
            <span>
              <span className="text-brand-600">TTS</span>
              <span className="text-gray-800">Maker</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#tool" className="hover:text-brand-600 transition">Home</a>
            <a href="#features" className="hover:text-brand-600 transition">Features</a>
            <a href="#languages" className="hover:text-brand-600 transition">Languages</a>
            <a href="#pricing" className="hover:text-brand-600 transition">API & Pricing</a>
            <a href="#faq" className="hover:text-brand-600 transition">FAQ</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-brand-600 transition">Log in</button>
            <button className="px-4 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-xl transition shadow-sm">Sign up free</button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {mobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-2 text-sm font-medium text-gray-700">
            <a href="#tool" className="block py-2 hover:text-brand-600" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#features" className="block py-2 hover:text-brand-600" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#languages" className="block py-2 hover:text-brand-600" onClick={() => setMobileMenuOpen(false)}>Languages</a>
            <a href="#pricing" className="block py-2 hover:text-brand-600" onClick={() => setMobileMenuOpen(false)}>API & Pricing</a>
            <a href="#faq" className="block py-2 hover:text-brand-600" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <div className="flex gap-2 pt-2 border-t border-gray-100">
              <button className="flex-1 py-2 text-center text-gray-600 rounded-lg border border-gray-200">Log in</button>
              <button className="flex-1 py-2 text-center text-white bg-brand-600 rounded-lg">Sign up</button>
            </div>
          </div>
        )}
      </header>

      {/* ═══════════ HERO ═══════════ */}
      <section className="bg-gradient-to-b from-brand-50 to-gray-50 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            Free AI <span className="text-brand-600">Text to Speech</span> Converter
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
            Convert any text to natural-sounding speech with AI neural voices.
            Choose from 12+ languages, adjust speed &amp; pitch, and download as MP3 — completely free.
          </p>
          <a
            href="#tool"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-500 transition shadow-lg shadow-brand-500/25"
          >
            Start Converting
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </a>
        </div>
      </section>

      {/* ═══════════ MAIN TOOL PANEL ═══════════ */}
      <section id="tool" className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-200 p-6 sm:p-8 space-y-6">
            {/* Voice & Language selector */}
            <VoiceSelector
              language={language}
              setLanguage={setLanguage}
              voice={voice}
              setVoice={setVoice}
            />

            {/* Text Input */}
            <TextInput text={text} setText={setText} />

            {/* Pause inserter */}
            <PauseInserter text={text} setText={setText} />

            {/* Speed / Pitch / Volume */}
            <SpeedPitchSliders
              speed={speed}
              setSpeed={setSpeed}
              pitch={pitch}
              setPitch={setPitch}
              volume={volume}
              setVolume={setVolume}
            />

            {/* Convert + Download */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <ConvertButton
                onClick={convertToSpeech}
                isLoading={isLoading}
                disabled={charCount === 0}
              />
              <DownloadButton audioUrl={audioUrl} downloadAudio={downloadAudio} />
              {audioUrl && (
                <button
                  onClick={clearResult}
                  className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-red-500 transition"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-8-4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Audio Player */}
            <AudioPlayer audioUrl={audioUrl} />

            {/* Conversion info */}
            {audioUrl && duration != null && (
              <p className="text-xs text-gray-400 text-center">
                Duration: ~{duration}s &middot; {charCount} characters
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3">
            Why use TTS Maker?
          </h3>
          <p className="text-center text-gray-500 mb-10 max-w-lg mx-auto">
            Everything you need to convert text to lifelike speech, all in one place.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 hover:shadow-md hover:border-brand-200 transition">
                <span className="text-3xl mb-3 block">{f.icon}</span>
                <h4 className="font-semibold text-gray-800 mb-1">{f.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SUPPORTED LANGUAGES GRID ═══════════ */}
      <section id="languages" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3">
            Supported Languages
          </h3>
          <p className="text-center text-gray-500 mb-10 max-w-lg mx-auto">
            Generate speech in 12+ languages and growing.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(voiceOptions).map(([code, { label, voices }]) => (
              <div
                key={code}
                className="rounded-xl border border-gray-200 bg-white p-4 text-center hover:shadow-md hover:border-brand-300 transition cursor-pointer"
                onClick={() => { setLanguage(code); document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                <span className="block text-xl mb-1">
                  {code.startsWith('en') ? '🇺🇸' : code === 'fr-FR' ? '🇫🇷' : code === 'de-DE' ? '🇩🇪' : code === 'es-ES' ? '🇪🇸' : code === 'pt-BR' ? '🇧🇷' : code === 'it-IT' ? '🇮🇹' : code === 'ja-JP' ? '🇯🇵' : code === 'ko-KR' ? '🇰🇷' : code === 'sw-KE' ? '🇰🇪' : code === 'hi-IN' ? '🇮🇳' : code === 'ar-SA' ? '🇸🇦' : '🌐'}
                </span>
                <span className="block text-sm font-semibold text-gray-800">{label}</span>
                <span className="block text-xs text-gray-400 mt-0.5">{voices.length} voice{voices.length > 1 ? 's' : ''}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PRICING / API UPSELL ═══════════ */}
      <section id="pricing" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3">
            API &amp; Pricing
          </h3>
          <p className="text-center text-gray-500 mb-10 max-w-lg mx-auto">
            Need more? Upgrade for higher limits, premium voices, and API access.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="rounded-2xl border-2 border-gray-200 p-6 flex flex-col">
              <h4 className="text-lg font-bold text-gray-800">Free</h4>
              <p className="text-3xl font-extrabold text-gray-900 mt-2">$0<span className="text-sm font-normal text-gray-400">/mo</span></p>
              <ul className="mt-5 space-y-2 text-sm text-gray-600 flex-1">
                <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> 5,000 chars / request</li>
                <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> 10 requests / minute</li>
                <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Free voices only</li>
                <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> MP3 download</li>
              </ul>
              <button className="mt-6 w-full py-2.5 rounded-xl border-2 border-brand-600 text-brand-600 font-semibold hover:bg-brand-50 transition">Current Plan</button>
            </div>

            {/* Pro */}
            <div className="rounded-2xl border-2 border-brand-500 p-6 flex flex-col shadow-lg shadow-brand-100 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</span>
              <h4 className="text-lg font-bold text-gray-800">Pro</h4>
              <p className="text-3xl font-extrabold text-gray-900 mt-2">$9<span className="text-sm font-normal text-gray-400">/mo</span></p>
              <ul className="mt-5 space-y-2 text-sm text-gray-600 flex-1">
                <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> 50,000 chars / day</li>
                <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Unlimited requests</li>
                <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> All premium voices</li>
                <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> REST API access</li>
                <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Audio history</li>
              </ul>
              <button className="mt-6 w-full py-2.5 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-500 transition shadow-md">Upgrade to Pro</button>
            </div>

            {/* Enterprise */}
            <div className="rounded-2xl border-2 border-gray-200 p-6 flex flex-col">
              <h4 className="text-lg font-bold text-gray-800">Enterprise</h4>
              <p className="text-3xl font-extrabold text-gray-900 mt-2">Custom</p>
              <ul className="mt-5 space-y-2 text-sm text-gray-600 flex-1">
                <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Unlimited characters</li>
                <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Dedicated API keys</li>
                <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Custom voice cloning</li>
                <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> SLA &amp; priority support</li>
                <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> On-premise option</li>
              </ul>
              <button className="mt-6 w-full py-2.5 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ RECENT HISTORY ═══════════ */}
      {history.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Conversions</h3>
            <div className="space-y-2">
              {history.map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm">
                  <span className="text-gray-600 truncate max-w-xs">{item.text}</span>
                  <span className="text-xs text-gray-400 flex-shrink-0 ml-4">{item.chars} chars &middot; {item.lang}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ FAQ ═══════════ */}
      <section id="faq" className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-gray-200 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 transition"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="text-white font-semibold mb-3">Product</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#tool" className="hover:text-white transition">Text to Speech</a></li>
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">Languages</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#languages" className="hover:text-white transition">English</a></li>
                <li><a href="#languages" className="hover:text-white transition">Spanish</a></li>
                <li><a href="#languages" className="hover:text-white transition">French</a></li>
                <li><a href="#languages" className="hover:text-white transition">More…</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">Developers</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#pricing" className="hover:text-white transition">API Access</a></li>
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">Status</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">Company</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} TTSMaker — AI Voice Generator. Built for scale.
          </div>
        </div>
      </footer>
    </div>
  );
}
