// Turns course content into lessons and exercise queues.
(function () {
  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const itemId = (unit, item) => unit.id + '|' + item.t;

  // Attach ids and split every unit into bite-sized lessons (4–5 new words each).
  function prepare(course) {
    if (course.ready) return course;
    course.allItems = [];
    course.byId = {};
    course.lessons = [];
    course.units.forEach(unit => {
      unit.items.forEach(item => {
        item.id = itemId(unit, item);
        item.unit = unit;
        course.allItems.push(item);
        course.byId[item.id] = item;
      });
      const count = unit.items.length <= 5 ? 1 : 2;
      const size = Math.ceil(unit.items.length / count);
      unit.lessons = [];
      for (let i = 0; i < count; i++) {
        const lesson = {
          id: unit.id + '#' + (i + 1), unit, number: i + 1,
          items: unit.items.slice(i * size, (i + 1) * size),
          sentences: (unit.sentences || []).filter((s, j) => j % count === i)
        };
        unit.lessons.push(lesson);
        course.lessons.push(lesson);
      }
    });
    course.ready = true;
    return course;
  }

  // Three wrong answers, preferring words from the same unit (they are the most confusable).
  function distractors(course, item, n) {
    const ok = [], seen = new Set([item.t]), seenEn = new Set([item.en]);
    const pools = [shuffle(item.unit.items), shuffle(course.allItems)];
    for (const pool of pools) {
      for (const cand of pool) {
        if (ok.length >= n) return ok;
        if (seen.has(cand.t) || seenEn.has(cand.en)) continue;
        seen.add(cand.t); seenEn.add(cand.en);
        ok.push(cand);
      }
    }
    return ok;
  }

  // Extra word tiles that do not belong in the sentence.
  function extraTiles(course, sentence, n) {
    const own = new Set(sentence.w), pool = new Set();
    course.units.forEach(u => (u.sentences || []).forEach(s => s.w.forEach(w => { if (!own.has(w)) pool.add(w); })));
    return shuffle([...pool]).slice(0, n);
  }

  function lessonQueue(lesson) {
    const q = [], items = lesson.items;
    // Teach two words, check them straight away, repeat.
    for (let i = 0; i < items.length; i += 2) {
      const pair = items.slice(i, i + 2);
      pair.forEach(item => q.push({ type: 'intro', item }));
      shuffle(pair).forEach(item => q.push({ type: 'mc_meaning', item }));
    }
    lesson.sentences.forEach(sentence => q.push({ type: 'sintro', sentence }));
    shuffle(items).forEach(item => q.push({ type: 'mc_target', item }));
    shuffle(items).slice(0, 2).forEach(item => q.push({ type: 'listen', item }));
    q.push({ type: 'match', items: shuffle(items).slice(0, 5) });
    shuffle(lesson.sentences).forEach(sentence => q.push({ type: 'build', sentence }));
    return q;
  }

  function reviewQueue(course, dueIds, doneLessons) {
    const types = ['mc_meaning', 'mc_target', 'listen'];
    const items = shuffle(dueIds.map(id => course.byId[id]).filter(Boolean)).slice(0, 12);
    const q = items.map(item => ({ type: types[Math.floor(Math.random() * types.length)], item }));
    const sentences = shuffle(doneLessons.flatMap(l => l.sentences)).slice(0, 2);
    sentences.forEach(sentence => q.push({ type: 'build', sentence }));
    return q;
  }

  window.LA = window.LA || {};
  window.LA.Session = { shuffle, prepare, distractors, extraTiles, lessonQueue, reviewQueue };
})();
