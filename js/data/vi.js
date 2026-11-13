window.COURSES = window.COURSES || {};
window.COURSES.vi = {
  code: 'vi', tts: 'vi-VN', name: 'Vietnamese', native: 'Tiếng Việt', badge: 'Vi', joiner: ' ',
  blurb: 'Latin alphabet, six tones, no verb conjugation.',
  units: [
    {
      id: 'greet', title: 'Greetings', desc: 'Say hello, thanks and sorry',
      tip: 'Vietnamese has six tones, shown by the marks on vowels (a, á, à, ả, ã, ạ). The tone changes the meaning, so listen to each word a few times and copy the melody.',
      items: [
        { t: 'Xin chào', en: 'Hello' },
        { t: 'Tạm biệt', en: 'Goodbye' },
        { t: 'Cảm ơn', en: 'Thank you' },
        { t: 'Xin lỗi', en: 'Sorry / Excuse me' },
        { t: 'Không có gì', en: "You're welcome", note: 'Literally "it is nothing".' },
        { t: 'Bạn khỏe không?', en: 'How are you?' },
        { t: 'Tôi khỏe', en: "I'm fine" },
        { t: 'Rất vui được gặp bạn', en: 'Nice to meet you' }
      ],
      sentences: [
        { w: ['Tôi', 'tên', 'là', 'Nam'], en: 'My name is Nam' },
        { w: ['Bạn', 'tên', 'là', 'gì'], en: 'What is your name?' },
        { w: ['Cảm ơn', 'bạn', 'rất', 'nhiều'], en: 'Thank you very much' }
      ]
    },
    {
      id: 'basics', title: 'Essentials', desc: 'Yes, no and getting understood',
      tip: 'To make a yes/no question, add "không" at the end of a statement: "Bạn hiểu" (you understand) → "Bạn hiểu không?" (do you understand?).',
      items: [
        { t: 'Vâng', en: 'Yes', note: 'Polite "yes" in the north. In the south you will hear "Dạ".' },
        { t: 'Không', en: 'No / not' },
        { t: 'Tôi', en: 'I / me' },
        { t: 'Bạn', en: 'You', note: 'Neutral "you" (literally "friend"). Vietnamese often uses family words like anh, chị, em instead.' },
        { t: 'Tôi không hiểu', en: "I don't understand" },
        { t: 'Bạn nói tiếng Anh không?', en: 'Do you speak English?' },
        { t: 'Làm ơn', en: 'Please' },
        { t: 'Được', en: 'OK / can do' }
      ],
      sentences: [
        { w: ['Tôi', 'đang', 'học', 'tiếng Việt'], en: 'I am learning Vietnamese' },
        { w: ['Tôi', 'không', 'hiểu', 'tiếng Việt'], en: "I don't understand Vietnamese" },
        { w: ['Bạn', 'nói', 'chậm', 'được', 'không'], en: 'Can you speak slowly?' }
      ]
    },
    {
      id: 'numbers', title: 'Numbers', desc: 'Count from 1 to 10',
      tip: 'Bigger numbers are built logically: 11 is "mười một" (ten one), 20 is "hai mươi" (two ten).',
      items: [
        { t: 'một', en: 'One (1)' }, { t: 'hai', en: 'Two (2)' }, { t: 'ba', en: 'Three (3)' },
        { t: 'bốn', en: 'Four (4)' }, { t: 'năm', en: 'Five (5)' }, { t: 'sáu', en: 'Six (6)' },
        { t: 'bảy', en: 'Seven (7)' }, { t: 'tám', en: 'Eight (8)' }, { t: 'chín', en: 'Nine (9)' },
        { t: 'mười', en: 'Ten (10)' }
      ],
      sentences: [
        { w: ['Tôi', 'có', 'hai', 'con', 'mèo'], en: 'I have two cats' },
        { w: ['Cho', 'tôi', 'ba', 'cái'], en: 'Give me three (of them)' }
      ]
    },
    {
      id: 'food', title: 'Food & drink', desc: 'Order and enjoy a meal',
      tip: '"Cho tôi…" (give me…) is the everyday way to order. Add "một" (one) and the thing you want.',
      items: [
        { t: 'Nước', en: 'Water' },
        { t: 'Cà phê', en: 'Coffee' },
        { t: 'Trà', en: 'Tea' },
        { t: 'Cơm', en: 'Rice (cooked)' },
        { t: 'Phở', en: 'Pho (noodle soup)' },
        { t: 'Bánh mì', en: 'Bread / baguette sandwich' },
        { t: 'Ngon quá!', en: 'So delicious!' },
        { t: 'Tính tiền', en: 'The bill, please' }
      ],
      sentences: [
        { w: ['Cho', 'tôi', 'một', 'cà phê', 'sữa đá'], en: 'One iced milk coffee, please' },
        { w: ['Tôi', 'muốn', 'uống', 'nước'], en: 'I want to drink water' },
        { w: ['Tôi', 'không', 'ăn', 'thịt'], en: "I don't eat meat" }
      ]
    },
    {
      id: 'around', title: 'Getting around', desc: 'Directions, prices and help',
      tip: 'Question words stay at the end: "Nhà vệ sinh ở đâu?" is literally "Toilet is where?".',
      items: [
        { t: 'Ở đâu?', en: 'Where?' },
        { t: 'Bao nhiêu tiền?', en: 'How much is it?' },
        { t: 'Đắt quá!', en: 'Too expensive!' },
        { t: 'Nhà vệ sinh', en: 'Restroom / toilet' },
        { t: 'Bên trái', en: 'Left side' },
        { t: 'Bên phải', en: 'Right side' },
        { t: 'Đi thẳng', en: 'Go straight' },
        { t: 'Giúp tôi với!', en: 'Help me!' }
      ],
      sentences: [
        { w: ['Nhà vệ sinh', 'ở', 'đâu'], en: 'Where is the restroom?' },
        { w: ['Cái này', 'bao nhiêu', 'tiền'], en: 'How much is this?' },
        { w: ['Tôi', 'muốn', 'đi', 'sân bay'], en: 'I want to go to the airport' }
      ]
    }
  ]
};
