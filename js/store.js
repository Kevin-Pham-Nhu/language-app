// Progress storage: lessons done, spaced-repetition schedule, streak, settings.
(function () {
  const KEY = 'tiny-lingo-v1';
  // Days until the next review for each memory level (index = level).
  const INTERVALS = [0, 1, 3, 7, 14, 30, 60];
  const MAX_LEVEL = INTERVALS.length - 1;

  const defaults = () => ({
    lang: null,
    settings: { roman: true, autoplay: true, listening: true },
    streak: { count: 0, last: null },
    courses: {}
  });

  let state = defaults();
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved && typeof saved === 'object') {
      state = Object.assign(defaults(), saved);
      state.settings = Object.assign(defaults().settings, saved.settings);
    }
  } catch (e) { /* storage unavailable or corrupt: start fresh */ }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  // Local calendar day as an integer, so "tomorrow" follows the learner's clock.
  function today() {
    const d = new Date();
    return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);
  }

  function course(lang) {
    if (!state.courses[lang]) state.courses[lang] = { done: {}, srs: {} };
    return state.courses[lang];
  }

  const Store = {
    INTERVALS, MAX_LEVEL, today,
    get state() { return state; },
    save,
    setLang(lang) { state.lang = lang; save(); },
    setSetting(key, value) { state.settings[key] = value; save(); },

    isDone(lang, lessonId) { return !!course(lang).done[lessonId]; },
    level(lang, itemId) { const s = course(lang).srs[itemId]; return s ? s.box : 0; },
    learnedCount(lang) { return Object.keys(course(lang).srs).length; },
    dueIds(lang) {
      const t = today(), srs = course(lang).srs;
      return Object.keys(srs).filter(id => srs[id].due <= t);
    },
    nextDueInDays(lang) {
      const srs = course(lang).srs, days = Object.values(srs).map(s => s.due - today());
      return days.length ? Math.max(1, Math.min(...days)) : null;
    },

    completeLesson(lang, lessonId, itemIds) {
      const c = course(lang);
      c.done[lessonId] = true;
      itemIds.forEach(id => { if (!c.srs[id]) c.srs[id] = { box: 1, due: today() + INTERVALS[1] }; });
      save();
    },
    // A correct review moves the word up a level; a miss sends it back to level 1.
    recordReview(lang, itemId, correct) {
      const s = course(lang).srs[itemId];
      if (!s) return;
      s.box = correct ? Math.min(MAX_LEVEL, s.box + 1) : 1;
      s.due = today() + INTERVALS[s.box];
      save();
    },

    streak() {
      const t = today(), s = state.streak;
      return s.last != null && t - s.last <= 1 ? s.count : 0;
    },
    practisedToday() { return state.streak.last === today(); },
    touchStreak() {
      const t = today(), s = state.streak;
      if (s.last === t) return;
      s.count = s.last === t - 1 ? s.count + 1 : 1;
      s.last = t;
      save();
    },

    resetCourse(lang) { delete state.courses[lang]; save(); }
  };

  window.LA = window.LA || {};
  window.LA.Store = Store;
})();
