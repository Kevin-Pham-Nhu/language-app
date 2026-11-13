window.COURSES = window.COURSES || {};
window.COURSES.ko = {
  code: 'ko', tts: 'ko-KR', name: 'Korean', native: '한국어', badge: '한', joiner: ' ',
  blurb: 'Hangul with romanization, polite everyday speech.',
  units: [
    {
      id: 'greet', title: 'Greetings', desc: 'Say hello, thanks and sorry',
      tip: 'Hangul is an alphabet: each block is one syllable built from 2–4 letters. Everything here uses the polite style (ending in 요 or 니다), which is safe with anyone.',
      items: [
        { t: '안녕하세요', r: 'annyeonghaseyo', en: 'Hello' },
        { t: '안녕히 가세요', r: 'annyeonghi gaseyo', en: 'Goodbye', note: 'Said to someone who is leaving. If you are the one leaving, say 안녕히 계세요 (annyeonghi gyeseyo).' },
        { t: '감사합니다', r: 'gamsahamnida', en: 'Thank you' },
        { t: '죄송합니다', r: 'joesonghamnida', en: 'Sorry' },
        { t: '천만에요', r: 'cheonmaneyo', en: "You're welcome" },
        { t: '잘 지내요?', r: 'jal jinaeyo?', en: 'How are you?' },
        { t: '괜찮아요', r: 'gwaenchanayo', en: "It's okay / I'm fine" },
        { t: '만나서 반갑습니다', r: 'mannaseo bangapseumnida', en: 'Nice to meet you' }
      ],
      sentences: [
        { w: ['제', '이름은', '민수예요'], r: 'je ireumeun Minsuyeyo', en: 'My name is Minsu' },
        { w: ['저는', '미국', '사람이에요'], r: 'jeoneun miguk saramieyo', en: 'I am American' },
        { w: ['만나서', '정말', '반갑습니다'], r: 'mannaseo jeongmal bangapseumnida', en: 'Really nice to meet you' }
      ]
    },
    {
      id: 'basics', title: 'Essentials', desc: 'Yes, no and getting understood',
      tip: 'The verb comes last in Korean. Small endings mark each word\'s job: 는/은 marks the topic, 를/을 marks the object.',
      items: [
        { t: '네', r: 'ne', en: 'Yes' },
        { t: '아니요', r: 'aniyo', en: 'No' },
        { t: '저', r: 'jeo', en: 'I / me (polite)' },
        { t: '이거', r: 'igeo', en: 'This (thing)' },
        { t: '모르겠어요', r: 'moreugesseoyo', en: "I don't understand / I don't know" },
        { t: '영어 할 수 있어요?', r: 'yeongeo hal su isseoyo?', en: 'Can you speak English?' },
        { t: '주세요', r: 'juseyo', en: 'Please give me…', note: 'Put it after the thing you want: 물 주세요 — "Water, please".' },
        { t: '좋아요', r: 'joayo', en: 'Good / OK' }
      ],
      sentences: [
        { w: ['저는', '한국어를', '공부해요'], r: 'jeoneun hangugeoreul gongbuhaeyo', en: 'I study Korean' },
        { w: ['한국어를', '잘', '못해요'], r: 'hangugeoreul jal mothaeyo', en: "I can't speak Korean well" },
        { w: ['천천히', '말해', '주세요'], r: 'cheoncheonhi malhae juseyo', en: 'Please speak slowly' }
      ]
    },
    {
      id: 'numbers', title: 'Numbers', desc: 'Count from 1 to 10',
      tip: 'Korean has two number sets. These are the Sino-Korean numbers, used for prices, dates and phone numbers. A second, native set (하나, 둘, 셋…) is used for counting things and for age.',
      items: [
        { t: '일', r: 'il', en: 'One (1)' }, { t: '이', r: 'i', en: 'Two (2)' }, { t: '삼', r: 'sam', en: 'Three (3)' },
        { t: '사', r: 'sa', en: 'Four (4)' }, { t: '오', r: 'o', en: 'Five (5)' }, { t: '육', r: 'yuk', en: 'Six (6)' },
        { t: '칠', r: 'chil', en: 'Seven (7)' }, { t: '팔', r: 'pal', en: 'Eight (8)' }, { t: '구', r: 'gu', en: 'Nine (9)' },
        { t: '십', r: 'sip', en: 'Ten (10)' }
      ],
      sentences: [
        { w: ['고양이가', '두', '마리', '있어요'], r: 'goyangiga du mari isseoyo', en: 'I have two cats' },
        { w: ['세', '개', '주세요'], r: 'se gae juseyo', en: 'Three, please' }
      ]
    },
    {
      id: 'food', title: 'Food & drink', desc: 'Order and enjoy a meal',
      tip: 'To order, name the thing and add 주세요 (juseyo). To say you want to do something, add 고 싶어요 (go sipeoyo) to the verb.',
      items: [
        { t: '물', r: 'mul', en: 'Water' },
        { t: '커피', r: 'keopi', en: 'Coffee' },
        { t: '차', r: 'cha', en: 'Tea' },
        { t: '밥', r: 'bap', en: 'Rice / a meal' },
        { t: '김치', r: 'gimchi', en: 'Kimchi' },
        { t: '불고기', r: 'bulgogi', en: 'Bulgogi (grilled marinated beef)' },
        { t: '맛있어요', r: 'masisseoyo', en: "It's delicious" },
        { t: '계산해 주세요', r: 'gyesanhae juseyo', en: 'The bill, please' }
      ],
      sentences: [
        { w: ['물', '좀', '주세요'], r: 'mul jom juseyo', en: 'Some water, please' },
        { w: ['저는', '고기를', '안', '먹어요'], r: 'jeoneun gogireul an meogeoyo', en: "I don't eat meat" },
        { w: ['커피를', '마시고', '싶어요'], r: 'keopireul masigo sipeoyo', en: 'I want to drink coffee' }
      ]
    },
    {
      id: 'around', title: 'Getting around', desc: 'Directions, prices and help',
      tip: 'Add 에 (e) to a place to mean "to" or "at": 공항에 — "to the airport".',
      items: [
        { t: '어디예요?', r: 'eodiyeyo?', en: 'Where is it?' },
        { t: '얼마예요?', r: 'eolmayeyo?', en: 'How much is it?' },
        { t: '너무 비싸요', r: 'neomu bissayo', en: 'Too expensive' },
        { t: '화장실', r: 'hwajangsil', en: 'Restroom / toilet' },
        { t: '왼쪽', r: 'oenjjok', en: 'Left' },
        { t: '오른쪽', r: 'oreunjjok', en: 'Right' },
        { t: '직진', r: 'jikjin', en: 'Straight ahead' },
        { t: '도와주세요!', r: 'dowajuseyo!', en: 'Help me!' }
      ],
      sentences: [
        { w: ['화장실은', '어디에', '있어요'], r: 'hwajangsireun eodie isseoyo', en: 'Where is the restroom?' },
        { w: ['이', '가방은', '얼마예요'], r: 'i gabangeun eolmayeyo', en: 'How much is this bag?' },
        { w: ['공항에', '가고', '싶어요'], r: 'gonghange gago sipeoyo', en: 'I want to go to the airport' }
      ]
    }
  ]
};
