// Text-to-speech using the voices built into the browser / device.
(function () {
  const synth = window.speechSynthesis;
  let voices = [];
  function load() { try { voices = synth.getVoices() || []; } catch (e) { voices = []; } }
  if (synth) {
    load();
    if (synth.addEventListener) synth.addEventListener('voiceschanged', load);
  }

  function voiceFor(lang) {
    const norm = v => v.lang.replace('_', '-').toLowerCase();
    const want = lang.toLowerCase(), base = want.split('-')[0];
    return voices.find(v => norm(v) === want) || voices.find(v => norm(v).split('-')[0] === base) || null;
  }

  const Speech = {
    supported: !!synth,
    // False only when we know for sure the device has no voice for this language.
    available(lang) {
      if (!synth) return false;
      if (!voices.length) load();
      return voices.length === 0 || !!voiceFor(lang);
    },
    speak(text, lang, rate) {
      if (!synth) return;
      try {
        synth.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = lang;
        const v = voiceFor(lang);
        if (v) u.voice = v;
        u.rate = rate || 0.9;
        synth.speak(u);
      } catch (e) { /* ignore */ }
    },
    stop() { if (synth) try { synth.cancel(); } catch (e) { /* ignore */ } }
  };

  window.LA = window.LA || {};
  window.LA.Speech = Speech;
})();
