# Tiny Lingo

A small, friendly web app for learning Vietnamese, Mandarin Chinese, Japanese and Korean.

## Run it

No install and no build step. Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## How it teaches

- **Short lessons** (about 3 minutes): 4–5 new words, checked straight away, then used in real sentences.
- **Five exercise types**: meaning, translation, listening, matching pairs, and building sentences from word tiles.
- **Spaced repetition**: learned words come back for review after 1, 3, 7, 14, 30 and 60 days; a miss resets the word.
- **No lives, no locks**: mistakes simply return at the end of the session, and every lesson is open.
- **Audio** uses the text-to-speech voices built into the device, with a slow-playback button.
- **Pronunciation help** (pinyin, romaji, romanization) can be switched off in settings once you can read the script.

Progress is saved in the browser's local storage on the device.

## Adding content

Each language is one file in `js/data/`. A unit has `items` (`t` text, `r` romanization, `en` meaning, optional `note` and `say` for a TTS override) and `sentences` (`w` word tiles in order, `r`, `en`). To add a language, create a new data file, add its `<script>` tag to `index.html`, and add its code to `ORDER` in `js/app.js`.
