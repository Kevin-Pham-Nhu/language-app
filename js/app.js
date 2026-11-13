// UI: language picker, course overview, lesson/review sessions.
(function () {
  const { Store, Speech, Session } = window.LA;
  const COURSES = window.COURSES;
  const ORDER = ['vi', 'zh', 'ja', 'ko'].filter(c => COURSES[c]);
  ORDER.forEach(c => Session.prepare(COURSES[c]));

  const root = document.getElementById('app');
  let onKey = null;   // keyboard handler of the current screen
  let S = null;       // the running session, if any

  document.addEventListener('keydown', e => {
    if (e.target.closest('dialog') || e.metaKey || e.ctrlKey || e.altKey) return;
    if (onKey) onKey(e);
  });

  // ---------- helpers ----------
  function h(tag, props, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(props || {})) {
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (const kid of kids.flat()) {
      if (kid == null || kid === false) continue;
      el.append(kid.nodeType ? kid : document.createTextNode(kid));
    }
    return el;
  }
  function show(...nodes) {
    root.replaceChildren(...nodes);
    window.scrollTo(0, 0);
  }
  const cur = () => COURSES[Store.state.lang];
  const settings = () => Store.state.settings;
  const plural = (n, word) => n + ' ' + word + (n === 1 ? '' : 's');
  const sentenceText = (course, s) => s.w.join(course.joiner);

  function say(text, rate) { Speech.speak(text, cur().tts, rate); }
  const sayItem = (item, rate) => say(item.say || item.t, rate);
  const canListen = () => settings().listening && Speech.available(cur().tts);

  function audioButtons(text, big) {
    if (!Speech.supported) return null;
    return h('div', { class: 'audio' + (big ? ' audio-big' : '') },
      h('button', { class: 'icon-btn speak', type: 'button', 'aria-label': 'Play audio', onclick: () => say(text) }, '🔊'),
      h('button', { class: 'icon-btn slow', type: 'button', 'aria-label': 'Play slowly', title: 'Play slowly', onclick: () => say(text, 0.55) }, '🐢'));
  }
  // Target-language text with the right lang tag (picks correct CJK glyphs and fonts).
  function target(text, cls) { return h('span', { class: 'tl ' + (cls || ''), lang: cur().tts }, text); }
  function roman(text, cls) { return text && settings().roman ? h('span', { class: 'roman ' + (cls || '') }, text) : null; }

  // ---------- language picker ----------
  function renderHome() {
    S = null; onKey = null; Speech.stop();
    show(h('main', { class: 'screen home' },
      h('header', { class: 'hero' },
        h('h1', {}, 'Tiny Lingo'),
        h('p', {}, 'Short lessons, real phrases, and smart review so the words actually stick.')),
      h('h2', { class: 'section-title' }, 'What do you want to learn?'),
      h('div', { class: 'lang-grid' }, ORDER.map(code => {
        const c = COURSES[code], learned = Store.learnedCount(code);
        return h('button', { class: 'lang-card', type: 'button', onclick: () => { Store.setLang(code); renderCourse(); } },
          h('span', { class: 'badge badge-' + code, lang: c.tts }, c.badge),
          h('span', { class: 'lang-text' },
            h('strong', {}, c.name),
            h('span', { class: 'native', lang: c.tts }, c.native),
            h('span', { class: 'muted' }, learned ? plural(learned, 'word') + ' learned' : c.blurb)));
      })),
      h('p', { class: 'muted footnote' }, 'Free, no account, no ads. Your progress is saved on this device.')));
  }

  // ---------- course overview ----------
  function renderCourse() {
    const course = cur();
    if (!course) return renderHome();
    S = null; onKey = null; Speech.stop();
    const lang = course.code;
    const due = Store.dueIds(lang).filter(id => course.byId[id]);
    const learned = Store.learnedCount(lang);
    const nextLesson = course.lessons.find(l => !Store.isDone(lang, l.id));
    const streak = Store.streak();

    let action;
    if (due.length) {
      action = h('div', { class: 'card action' },
        h('div', {}, h('strong', {}, 'Time to review'), h('p', { class: 'muted' }, plural(due.length, 'word') + ' ready — reviewing now is what makes them stick.')),
        h('button', { class: 'btn primary', type: 'button', onclick: startReview }, 'Review ' + plural(due.length, 'word')));
    } else if (nextLesson) {
      action = h('div', { class: 'card action' },
        h('div', {}, h('strong', {}, learned ? 'Keep going' : 'Start here'),
          h('p', { class: 'muted' }, nextLesson.unit.title + ' · Lesson ' + nextLesson.number + ' · about 3 minutes')),
        h('button', { class: 'btn primary', type: 'button', onclick: () => startLesson(nextLesson) }, learned ? 'Next lesson' : 'Start learning'));
    } else {
      const days = Store.nextDueInDays(lang);
      action = h('div', { class: 'card action' },
        h('div', {}, h('strong', {}, 'All caught up 🎉'),
          h('p', { class: 'muted' }, 'Every lesson is done. Your next review is in ' + plural(days || 1, 'day') + '.')));
    }

    const voiceMissing = Speech.supported && !Speech.available(course.tts);

    show(h('main', { class: 'screen course' },
      h('header', { class: 'topbar' },
        h('button', { class: 'link-btn', type: 'button', onclick: renderHome }, '‹ Languages'),
        h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Settings', onclick: openSettings }, '⚙️')),
      h('div', { class: 'course-head' },
        h('span', { class: 'badge badge-' + lang, lang: course.tts }, course.badge),
        h('div', {}, h('h1', {}, course.name), h('span', { class: 'native', lang: course.tts }, course.native))),
      h('div', { class: 'stats' },
        stat(streak, 'day streak', Store.practisedToday() ? 'Practised today' : 'Practise today to keep it'),
        stat(learned, 'words learned'),
        stat(due.length, 'to review')),
      action,
      voiceMissing && h('p', { class: 'notice' }, 'This device has no ' + course.name + ' voice installed, so audio is off. You can add one in your device\'s text-to-speech settings.'),
      h('h2', { class: 'section-title' }, 'Lessons'),
      course.units.map((unit, i) => unitCard(course, unit, i, nextLesson))));
  }

  function stat(value, label, title) {
    return h('div', { class: 'stat', title }, h('strong', {}, String(value)), h('span', {}, label));
  }

  function unitCard(course, unit, index, nextLesson) {
    const lang = course.code;
    return h('section', { class: 'card unit' },
      h('div', { class: 'unit-head' },
        h('span', { class: 'unit-num' }, String(index + 1)),
        h('div', {}, h('h3', {}, unit.title), h('p', { class: 'muted' }, unit.desc))),
      h('div', { class: 'lesson-row' }, unit.lessons.map(lesson => {
        const done = Store.isDone(lang, lesson.id), next = lesson === nextLesson;
        return h('button', {
          class: 'btn lesson' + (done ? ' done' : '') + (next ? ' primary' : ''), type: 'button',
          onclick: () => startLesson(lesson)
        }, (done ? '✓ ' : '') + 'Lesson ' + lesson.number);
      })),
      h('details', { class: 'words' },
        h('summary', {}, 'Words & tips'),
        unit.tip && h('p', { class: 'tip' }, '💡 ' + unit.tip),
        h('ul', {}, unit.items.map(item => h('li', {},
          Speech.supported && h('button', { class: 'icon-btn small', type: 'button', 'aria-label': 'Play ' + item.en, onclick: () => sayItem(item) }, '🔊'),
          h('span', { class: 'word' }, target(item.t), roman(item.r)),
          h('span', { class: 'meaning' }, item.en),
          strength(Store.level(lang, item.id)))))));
  }

  function strength(level) {
    const label = level === 0 ? 'Not learned yet' : 'Memory strength ' + level + ' of ' + Store.MAX_LEVEL;
    const dots = [1, 2, 3].map(i => h('i', { class: level >= i * 2 - 1 ? (level >= i * 2 ? 'full' : 'half') : '' }));
    return h('span', { class: 'strength', title: label, 'aria-label': label }, dots);
  }

  function openSettings() {
    const course = cur();
    const toggle = (key, label, hint) => h('label', { class: 'toggle' },
      h('input', Object.assign({ type: 'checkbox', onchange: e => Store.setSetting(key, e.target.checked) }, settings()[key] ? { checked: true } : {})),
      h('span', {}, h('strong', {}, label), h('small', { class: 'muted' }, hint)));
    const dlg = h('dialog', { class: 'sheet' },
      h('h2', {}, 'Settings'),
      toggle('roman', 'Show pronunciation', 'Pinyin, romaji and romanization next to the script.'),
      toggle('autoplay', 'Play audio automatically', 'Hear each word as it appears.'),
      toggle('listening', 'Listening exercises', 'Turn off when you can\'t use sound.'),
      h('div', { class: 'sheet-actions' },
        h('button', { class: 'btn danger', type: 'button', onclick: e => {
          // Two taps instead of a browser confirm box, which some embedded views block.
          if (e.currentTarget.dataset.armed) { Store.resetCourse(course.code); dlg.close(); return; }
          e.currentTarget.dataset.armed = '1';
          e.currentTarget.textContent = 'Tap again to erase it all';
        } }, 'Reset ' + course.name + ' progress'),
        h('button', { class: 'btn primary', type: 'button', onclick: () => dlg.close() }, 'Done')));
    dlg.addEventListener('close', () => { dlg.remove(); renderCourse(); });
    document.body.append(dlg);
    dlg.showModal();
  }

  // ---------- sessions ----------
  function startLesson(lesson) {
    startSession({ kind: 'lesson', lesson, title: lesson.unit.title + ' · Lesson ' + lesson.number }, Session.lessonQueue(lesson));
  }
  function startReview() {
    const course = cur(), lang = course.code;
    const due = Store.dueIds(lang).filter(id => course.byId[id]);
    const done = course.lessons.filter(l => Store.isDone(lang, l.id));
    startSession({ kind: 'review', title: 'Review' }, Session.reviewQueue(course, due, done));
  }
  function startSession(meta, queue) {
    S = { meta, queue, pos: 0, graded: 0, correct: 0, noListen: false, missed: [] };
    renderStep();
  }

  function quit() {
    if (!S || S.pos === 0) return renderCourse();
    const dlg = h('dialog', { class: 'sheet' },
      h('h2', {}, 'Leave this session?'),
      h('p', { class: 'muted' }, 'Your progress in it will be lost.'),
      h('div', { class: 'sheet-actions' },
        h('button', { class: 'btn danger', type: 'button', onclick: () => { dlg.close(); renderCourse(); } }, 'Leave'),
        h('button', { class: 'btn primary', type: 'button', onclick: () => dlg.close() }, 'Keep going')));
    dlg.addEventListener('close', () => dlg.remove());
    document.body.append(dlg);
    dlg.showModal();
  }

  // First-try answers count towards accuracy; misses come back at the end of the session.
  function grade(ex, ok) {
    if (!ex.retry) {
      S.graded++;
      if (ok) S.correct++;
      if (S.meta.kind === 'review' && ex.item) Store.recordReview(cur().code, ex.item.id, ok);
    }
    if (!ok) {
      S.queue.push(Object.assign({}, ex, { retry: true }));
      const label = ex.item ? ex.item : ex.sentence;
      if (!S.missed.includes(label)) S.missed.push(label);
    }
  }

  function next() { S.pos++; renderStep(); }

  function renderStep() {
    if (S.pos >= S.queue.length) return finish();
    let ex = S.queue[S.pos];
    if (ex.type === 'listen' && (S.noListen || !canListen())) ex = S.queue[S.pos] = Object.assign({}, ex, { type: 'mc_meaning' });
    onKey = null;
    const body = h('div', { class: 'exercise' });
    const footer = h('footer', { class: 'session-foot' });
    show(h('main', { class: 'screen session' },
      h('header', { class: 'session-head' },
        h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Close', onclick: quit }, '✕'),
        h('div', { class: 'progress', role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': S.queue.length, 'aria-valuenow': S.pos },
          h('i', { style: 'width:' + Math.round(100 * S.pos / S.queue.length) + '%' }))),
      body, footer));
    ({ intro: exIntro, sintro: exSentenceIntro, mc_meaning: exChoice, mc_target: exChoice, listen: exChoice, match: exMatch, build: exBuild })[ex.type](ex, body, footer);
  }

  function continueButton(footer, label) {
    const btn = h('button', { class: 'btn primary wide', type: 'button', onclick: next }, label || 'Continue');
    footer.append(btn);
    onKey = e => { if (e.key === 'Enter') { e.preventDefault(); next(); } };
    btn.focus({ preventScroll: true });
  }

  function feedback(footer, ok, lines) {
    footer.classList.add(ok ? 'ok' : 'bad');
    footer.append(h('div', { class: 'feedback', role: 'status' },
      h('strong', {}, ok ? 'Correct!' : 'Not quite — here\'s the answer'), lines));
    continueButton(footer);
  }
  const itemLine = item => h('p', {}, target(item.t), ' ', roman(item.r), ' — ', item.en);
  const sentenceLine = s => h('p', {}, target(sentenceText(cur(), s)), ' ', roman(s.r), ' — ', s.en);

  // --- new word ---
  function exIntro(ex, body, footer) {
    const item = ex.item;
    body.append(
      h('p', { class: 'kicker' }, 'New word'),
      h('div', { class: 'card flash' },
        target(item.t, 'big'), roman(item.r, 'big-roman'),
        h('p', { class: 'flash-en' }, item.en),
        audioButtons(item.say || item.t, true),
        item.note && h('p', { class: 'tip' }, '💡 ' + item.note)));
    continueButton(footer, 'Got it');
    if (settings().autoplay) sayItem(item);
  }

  // --- new sentence ---
  function exSentenceIntro(ex, body, footer) {
    const s = ex.sentence, text = sentenceText(cur(), s);
    body.append(
      h('p', { class: 'kicker' }, 'New sentence'),
      h('div', { class: 'card flash' },
        h('div', { class: 'chunks' }, s.w.map(w => target(w, 'chunk'))),
        roman(s.r, 'big-roman'),
        h('p', { class: 'flash-en' }, s.en),
        audioButtons(text, true),
        h('p', { class: 'muted' }, 'Notice the word order — you\'ll build this sentence yourself in a moment.')));
    continueButton(footer, 'Got it');
    if (settings().autoplay) say(text);
  }

  // --- multiple choice (meaning, translation or listening) ---
  function exChoice(ex, body, footer) {
    const item = ex.item, type = ex.type, toTarget = type === 'mc_target';
    const options = Session.shuffle([item, ...Session.distractors(cur(), item, 3)]);
    let answered = false;

    if (type === 'mc_meaning') {
      body.append(h('p', { class: 'kicker' }, 'What does this mean?'),
        h('div', { class: 'prompt' }, target(item.t, 'big'), roman(item.r, 'big-roman'), audioButtons(item.say || item.t)));
    } else if (type === 'listen') {
      body.append(h('p', { class: 'kicker' }, 'Listen — what does it mean?'),
        h('div', { class: 'prompt' }, audioButtons(item.say || item.t, true),
          h('button', { class: 'link-btn', type: 'button', onclick: () => { S.noListen = true; renderStep(); } }, 'I can\'t listen right now')));
    } else {
      body.append(h('p', { class: 'kicker' }, 'How do you say this?'),
        h('div', { class: 'prompt' }, h('span', { class: 'big-en' }, item.en)));
    }

    const buttons = options.map((opt, i) => h('button', { class: 'option', type: 'button', onclick: () => pick(i) },
      h('kbd', {}, String(i + 1)),
      toTarget ? h('span', { class: 'opt-text' }, target(opt.t), roman(opt.r)) : h('span', { class: 'opt-text' }, opt.en)));
    body.append(h('div', { class: 'options' }, buttons));

    function pick(i) {
      if (answered) return;
      answered = true;
      const ok = options[i] === item;
      buttons.forEach((b, j) => {
        b.disabled = true;
        if (options[j] === item) b.classList.add('right');
        else if (j === i) b.classList.add('wrong');
      });
      grade(ex, ok);
      feedback(footer, ok, itemLine(item));
      if (settings().autoplay && type !== 'mc_meaning') sayItem(item);
    }
    onKey = e => { const n = Number(e.key); if (n >= 1 && n <= options.length) pick(n - 1); };
    if (settings().autoplay && type !== 'mc_target') sayItem(item);
  }

  // --- match pairs ---
  function exMatch(ex, body, footer) {
    const left = Session.shuffle(ex.items), right = Session.shuffle(ex.items);
    let pickL = null, pickR = null, matched = 0;
    const mk = (item, side) => {
      const btn = h('button', { class: 'option match', type: 'button', onclick: () => choose(item, side, btn) },
        side === 'L' ? h('span', { class: 'opt-text' }, target(item.t), roman(item.r)) : h('span', { class: 'opt-text' }, item.en));
      return btn;
    };
    body.append(h('p', { class: 'kicker' }, 'Match the pairs'),
      h('div', { class: 'match-grid' },
        h('div', { class: 'match-col' }, left.map(i => mk(i, 'L'))),
        h('div', { class: 'match-col' }, right.map(i => mk(i, 'R')))));

    function choose(item, side, btn) {
      const prev = side === 'L' ? pickL : pickR;
      if (prev) prev.btn.classList.remove('selected');
      const sel = { item, btn };
      btn.classList.add('selected');
      if (side === 'L') { pickL = sel; if (settings().autoplay) sayItem(item); } else pickR = sel;
      if (!pickL || !pickR) return;
      const a = pickL, b = pickR;
      pickL = pickR = null;
      [a.btn, b.btn].forEach(x => x.classList.remove('selected'));
      if (a.item === b.item) {
        [a.btn, b.btn].forEach(x => { x.classList.add('right'); x.disabled = true; });
        if (++matched === ex.items.length) {
          footer.classList.add('ok');
          footer.append(h('div', { class: 'feedback', role: 'status' }, h('strong', {}, 'All matched!')));
          continueButton(footer);
        }
      } else {
        [a.btn, b.btn].forEach(x => { x.classList.add('wrong'); setTimeout(() => x.classList.remove('wrong'), 450); });
      }
    }
  }

  // --- build the sentence from word tiles ---
  function exBuild(ex, body, footer) {
    const s = ex.sentence, course = cur();
    const tiles = Session.shuffle([...s.w, ...Session.extraTiles(course, s, 2)]).map(text => ({ text, used: false }));
    const picked = [];
    let answered = false;
    const answer = h('div', { class: 'answer-line', 'aria-label': 'Your answer' });
    const bank = h('div', { class: 'tile-bank' });
    const check = h('button', { class: 'btn primary wide', type: 'button', disabled: true, onclick: submit }, 'Check');
    body.append(h('p', { class: 'kicker' }, 'Build this sentence'),
      h('div', { class: 'prompt' }, h('span', { class: 'big-en' }, s.en)), answer, bank);
    footer.append(check);
    draw();

    function draw() {
      answer.replaceChildren(...picked.map((tile, i) => h('button', { class: 'tile', type: 'button', disabled: answered, onclick: () => { tile.used = false; picked.splice(i, 1); draw(); } }, target(tile.text))));
      bank.replaceChildren(...tiles.map(tile => h('button', { class: 'tile' + (tile.used ? ' used' : ''), type: 'button', disabled: tile.used || answered, onclick: () => { tile.used = true; picked.push(tile); draw(); } }, target(tile.text))));
      check.disabled = picked.length === 0;
    }
    function submit() {
      if (answered || !picked.length) return;
      answered = true;
      const ok = picked.map(t => t.text).join('\u0001') === s.w.join('\u0001');
      draw();
      answer.classList.add(ok ? 'right' : 'wrong');
      check.remove();
      grade(ex, ok);
      feedback(footer, ok, sentenceLine(s));
      if (settings().autoplay) say(sentenceText(course, s));
    }
    onKey = e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } };
  }

  // ---------- end of session ----------
  function finish() {
    const course = cur(), meta = S.meta, lesson = meta.lesson;
    const firstTime = lesson && !Store.isDone(course.code, lesson.id);
    if (lesson) Store.completeLesson(course.code, lesson.id, lesson.items.map(i => i.id));
    Store.touchStreak();
    const accuracy = S.graded ? Math.round(100 * S.correct / S.graded) : 100;
    const missed = S.missed;
    onKey = e => { if (e.key === 'Enter') { e.preventDefault(); renderCourse(); } };
    const summary = lesson
      ? (firstTime ? plural(lesson.items.length, 'new word') + ' added to your reviews. You\'ll see them again tomorrow.' : 'Good practice — repetition is how it sticks.')
      : 'Reviewed words now come back at longer and longer gaps.';
    const btn = h('button', { class: 'btn primary wide', type: 'button', onclick: renderCourse }, 'Continue');
    show(h('main', { class: 'screen done' },
      h('div', { class: 'done-mark', 'aria-hidden': 'true' }, '✓'),
      h('h1', {}, lesson ? 'Lesson complete!' : 'Review complete!'),
      h('p', { class: 'muted' }, summary),
      h('div', { class: 'stats' }, stat(accuracy + '%', 'first-try accuracy'), stat(Store.streak(), 'day streak')),
      missed.length ? h('div', { class: 'card missed' },
        h('strong', {}, 'Worth another look'),
        h('ul', {}, missed.map(m => h('li', {}, m.w ? sentenceLine(m) : itemLine(m))))) : null,
      btn));
    btn.focus({ preventScroll: true });
  }

  if (cur()) renderCourse(); else renderHome();
})();
