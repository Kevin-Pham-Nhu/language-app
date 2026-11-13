window.COURSES = window.COURSES || {};
window.COURSES.ja = {
  code: 'ja', tts: 'ja-JP', name: 'Japanese', native: '日本語', badge: 'あ', joiner: '',
  blurb: 'Kana and kanji with romaji to get you started.',
  units: [
    {
      id: 'greet', title: 'Greetings', desc: 'Say hello, thanks and sorry',
      tip: 'A line over a vowel in romaji (ā, ō, ū) means it is held twice as long. Japanese pronunciation is very regular: every syllable gets about the same weight.',
      items: [
        { t: 'こんにちは', r: 'konnichiwa', en: 'Hello' },
        { t: 'さようなら', r: 'sayōnara', en: 'Goodbye' },
        { t: 'ありがとう', r: 'arigatō', en: 'Thank you', note: 'Add ございます (gozaimasu) to be more polite.' },
        { t: 'すみません', r: 'sumimasen', en: 'Excuse me / Sorry' },
        { t: 'どういたしまして', r: 'dō itashimashite', en: "You're welcome" },
        { t: 'おはよう', r: 'ohayō', en: 'Good morning' },
        { t: 'こんばんは', r: 'konbanwa', en: 'Good evening' },
        { t: 'はじめまして', r: 'hajimemashite', en: 'Nice to meet you' }
      ],
      sentences: [
        { w: ['私', 'は', 'ケン', 'です'], r: 'watashi wa Ken desu', en: 'I am Ken' },
        { w: ['お名前', 'は', '何', 'です', 'か'], r: 'o-namae wa nan desu ka', en: 'What is your name?' },
        { w: ['お元気', 'です', 'か'], r: 'o-genki desu ka', en: 'How are you?' }
      ]
    },
    {
      id: 'basics', title: 'Essentials', desc: 'Yes, no and getting understood',
      tip: 'The verb comes last in Japanese, and small particles mark each word\'s job: は (wa) marks the topic, を (o) marks the object. Ending with か (ka) makes a question.',
      items: [
        { t: 'はい', r: 'hai', en: 'Yes' },
        { t: 'いいえ', r: 'iie', en: 'No' },
        { t: '私', r: 'watashi', en: 'I / me', say: 'わたし' },
        { t: 'あなた', r: 'anata', en: 'You', note: 'Used sparingly. People usually say the person\'s name plus さん (san) instead.' },
        { t: 'わかりません', r: 'wakarimasen', en: "I don't understand" },
        { t: '英語を話せますか？', r: 'eigo o hanasemasu ka?', en: 'Do you speak English?' },
        { t: 'お願いします', r: 'onegaishimasu', en: 'Please' },
        { t: '大丈夫', r: 'daijōbu', en: "It's okay / I'm fine" }
      ],
      sentences: [
        { w: ['日本語', 'を', '勉強', 'して', 'います'], r: 'nihongo o benkyō shite imasu', en: 'I am studying Japanese' },
        { w: ['日本語', 'が', 'わかりません'], r: 'nihongo ga wakarimasen', en: "I don't understand Japanese" },
        { w: ['ゆっくり', '話して', 'ください'], r: 'yukkuri hanashite kudasai', en: 'Please speak slowly' }
      ]
    },
    {
      id: 'numbers', title: 'Numbers', desc: 'Count from 1 to 10',
      tip: '4 and 7 each have two readings: yon / shi and nana / shichi. Yon and nana are the safe everyday choices. 11 is 十一 (jū-ichi), 20 is 二十 (ni-jū).',
      items: [
        { t: '一', r: 'ichi', en: 'One (1)', say: 'いち' }, { t: '二', r: 'ni', en: 'Two (2)', say: 'に' },
        { t: '三', r: 'san', en: 'Three (3)', say: 'さん' }, { t: '四', r: 'yon', en: 'Four (4)', say: 'よん' },
        { t: '五', r: 'go', en: 'Five (5)', say: 'ご' }, { t: '六', r: 'roku', en: 'Six (6)', say: 'ろく' },
        { t: '七', r: 'nana', en: 'Seven (7)', say: 'なな' }, { t: '八', r: 'hachi', en: 'Eight (8)', say: 'はち' },
        { t: '九', r: 'kyū', en: 'Nine (9)', say: 'きゅう' }, { t: '十', r: 'jū', en: 'Ten (10)', say: 'じゅう' }
      ],
      sentences: [
        { w: ['猫', 'が', '二匹', 'います'], r: 'neko ga nihiki imasu', en: 'I have two cats' },
        { w: ['三つ', 'ください'], r: 'mittsu kudasai', en: 'Three, please' }
      ]
    },
    {
      id: 'food', title: 'Food & drink', desc: 'Order and enjoy a meal',
      tip: 'To order, name the thing and add をください (o kudasai): 水をください — "Water, please". Words borrowed from other languages are written in katakana, like コーヒー.',
      items: [
        { t: '水', r: 'mizu', en: 'Water', say: 'みず' },
        { t: 'お茶', r: 'ocha', en: 'Tea' },
        { t: 'コーヒー', r: 'kōhī', en: 'Coffee' },
        { t: 'ご飯', r: 'gohan', en: 'Rice / a meal' },
        { t: 'ラーメン', r: 'rāmen', en: 'Ramen' },
        { t: '寿司', r: 'sushi', en: 'Sushi' },
        { t: 'おいしい', r: 'oishii', en: 'Delicious' },
        { t: 'お会計お願いします', r: 'okaikei onegaishimasu', en: 'The bill, please' }
      ],
      sentences: [
        { w: ['水', 'を', 'ください'], r: 'mizu o kudasai', en: 'Water, please' },
        { w: ['肉', 'は', '食べません'], r: 'niku wa tabemasen', en: "I don't eat meat" },
        { w: ['コーヒー', 'を', '飲みたい', 'です'], r: 'kōhī o nomitai desu', en: 'I want to drink coffee' }
      ]
    },
    {
      id: 'around', title: 'Getting around', desc: 'Directions, prices and help',
      tip: 'Swap the first word to ask about anything: トイレはどこですか (where is the toilet?), 駅はどこですか (where is the station?).',
      items: [
        { t: 'どこですか？', r: 'doko desu ka?', en: 'Where is it?' },
        { t: 'いくらですか？', r: 'ikura desu ka?', en: 'How much is it?' },
        { t: '高いです', r: 'takai desu', en: "It's expensive" },
        { t: 'トイレ', r: 'toire', en: 'Restroom / toilet' },
        { t: '左', r: 'hidari', en: 'Left', say: 'ひだり' },
        { t: '右', r: 'migi', en: 'Right', say: 'みぎ' },
        { t: 'まっすぐ', r: 'massugu', en: 'Straight ahead' },
        { t: '助けて！', r: 'tasukete!', en: 'Help!' }
      ],
      sentences: [
        { w: ['トイレ', 'は', 'どこ', 'です', 'か'], r: 'toire wa doko desu ka', en: 'Where is the restroom?' },
        { w: ['これ', 'は', 'いくら', 'です', 'か'], r: 'kore wa ikura desu ka', en: 'How much is this?' },
        { w: ['空港', 'に', '行きたい', 'です'], r: 'kūkō ni ikitai desu', en: 'I want to go to the airport' }
      ]
    }
  ]
};
