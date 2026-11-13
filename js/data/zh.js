window.COURSES = window.COURSES || {};
window.COURSES.zh = {
  code: 'zh', tts: 'zh-CN', name: 'Chinese', native: '中文 (Mandarin)', badge: '中', joiner: '',
  blurb: 'Simplified characters with pinyin and tones.',
  units: [
    {
      id: 'greet', title: 'Greetings', desc: 'Say hello, thanks and sorry',
      tip: 'Mandarin has four tones, shown by marks in pinyin: mā (high, flat), má (rising), mǎ (dip then rise), mà (falling). Syllables with no mark are light and short.',
      items: [
        { t: '你好', r: 'nǐ hǎo', en: 'Hello' },
        { t: '再见', r: 'zàijiàn', en: 'Goodbye' },
        { t: '谢谢', r: 'xièxie', en: 'Thank you' },
        { t: '不客气', r: 'bú kèqi', en: "You're welcome" },
        { t: '对不起', r: 'duìbuqǐ', en: 'Sorry' },
        { t: '没关系', r: 'méi guānxi', en: "It's okay / No problem" },
        { t: '你好吗？', r: 'nǐ hǎo ma?', en: 'How are you?' },
        { t: '很高兴认识你', r: 'hěn gāoxìng rènshi nǐ', en: 'Nice to meet you' }
      ],
      sentences: [
        { w: ['我', '叫', '小明'], r: 'wǒ jiào Xiǎomíng', en: 'My name is Xiaoming' },
        { w: ['你', '叫', '什么', '名字'], r: 'nǐ jiào shénme míngzi', en: 'What is your name?' },
        { w: ['我', '很', '好'], r: 'wǒ hěn hǎo', en: 'I am very well' }
      ]
    },
    {
      id: 'basics', title: 'Essentials', desc: 'Yes, no and getting understood',
      tip: 'Add 吗 (ma) to the end of a statement to turn it into a yes/no question. Put 不 (bù) before a verb to make it negative.',
      items: [
        { t: '是', r: 'shì', en: 'Yes / to be' },
        { t: '不是', r: 'bú shì', en: 'No / is not' },
        { t: '我', r: 'wǒ', en: 'I / me' },
        { t: '你', r: 'nǐ', en: 'You' },
        { t: '我不懂', r: 'wǒ bù dǒng', en: "I don't understand" },
        { t: '你会说英语吗？', r: 'nǐ huì shuō Yīngyǔ ma?', en: 'Do you speak English?' },
        { t: '请', r: 'qǐng', en: 'Please' },
        { t: '好的', r: 'hǎo de', en: 'OK' }
      ],
      sentences: [
        { w: ['我', '在', '学', '中文'], r: 'wǒ zài xué Zhōngwén', en: 'I am learning Chinese' },
        { w: ['我', '不', '会', '说', '中文'], r: 'wǒ bú huì shuō Zhōngwén', en: "I can't speak Chinese" },
        { w: ['请', '说', '慢', '一点'], r: 'qǐng shuō màn yìdiǎn', en: 'Please speak a bit slower' }
      ]
    },
    {
      id: 'numbers', title: 'Numbers', desc: 'Count from 1 to 10',
      tip: 'Bigger numbers are simple maths: 十一 (ten-one) is 11, 二十 (two-ten) is 20. When counting things, "two" is 两 (liǎng) instead of 二.',
      items: [
        { t: '一', r: 'yī', en: 'One (1)' }, { t: '二', r: 'èr', en: 'Two (2)' }, { t: '三', r: 'sān', en: 'Three (3)' },
        { t: '四', r: 'sì', en: 'Four (4)' }, { t: '五', r: 'wǔ', en: 'Five (5)' }, { t: '六', r: 'liù', en: 'Six (6)' },
        { t: '七', r: 'qī', en: 'Seven (7)' }, { t: '八', r: 'bā', en: 'Eight (8)' }, { t: '九', r: 'jiǔ', en: 'Nine (9)' },
        { t: '十', r: 'shí', en: 'Ten (10)' }
      ],
      sentences: [
        { w: ['我', '有', '两', '只', '猫'], r: 'wǒ yǒu liǎng zhī māo', en: 'I have two cats' },
        { w: ['我', '要', '三', '个'], r: 'wǒ yào sān ge', en: 'I want three (of them)' }
      ]
    },
    {
      id: 'food', title: 'Food & drink', desc: 'Order and enjoy a meal',
      tip: '我想… (wǒ xiǎng, "I would like to…") is a polite way to say what you want. 我要… (wǒ yào, "I want…") is more direct and normal when ordering.',
      items: [
        { t: '水', r: 'shuǐ', en: 'Water' },
        { t: '茶', r: 'chá', en: 'Tea' },
        { t: '咖啡', r: 'kāfēi', en: 'Coffee' },
        { t: '米饭', r: 'mǐfàn', en: 'Rice (cooked)' },
        { t: '面条', r: 'miàntiáo', en: 'Noodles' },
        { t: '饺子', r: 'jiǎozi', en: 'Dumplings' },
        { t: '好吃', r: 'hǎochī', en: 'Delicious' },
        { t: '买单', r: 'mǎidān', en: 'The bill, please' }
      ],
      sentences: [
        { w: ['我', '想', '喝', '水'], r: 'wǒ xiǎng hē shuǐ', en: 'I want to drink water' },
        { w: ['我', '不', '吃', '肉'], r: 'wǒ bù chī ròu', en: "I don't eat meat" },
        { w: ['请', '给', '我', '一', '杯', '茶'], r: 'qǐng gěi wǒ yì bēi chá', en: 'Please give me a cup of tea' }
      ]
    },
    {
      id: 'around', title: 'Getting around', desc: 'Directions, prices and help',
      tip: 'Question words stay where the answer would go: 洗手间在哪儿？ is literally "Restroom is where?".',
      items: [
        { t: '在哪儿？', r: 'zài nǎr?', en: 'Where is it?' },
        { t: '多少钱？', r: 'duōshao qián?', en: 'How much is it?' },
        { t: '太贵了', r: 'tài guì le', en: 'Too expensive' },
        { t: '洗手间', r: 'xǐshǒujiān', en: 'Restroom / toilet' },
        { t: '左边', r: 'zuǒbian', en: 'Left side' },
        { t: '右边', r: 'yòubian', en: 'Right side' },
        { t: '一直走', r: 'yìzhí zǒu', en: 'Go straight' },
        { t: '救命！', r: 'jiùmìng!', en: 'Help!' }
      ],
      sentences: [
        { w: ['洗手间', '在', '哪儿'], r: 'xǐshǒujiān zài nǎr', en: 'Where is the restroom?' },
        { w: ['这个', '多少', '钱'], r: 'zhège duōshao qián', en: 'How much is this?' },
        { w: ['我', '要', '去', '机场'], r: 'wǒ yào qù jīchǎng', en: 'I want to go to the airport' }
      ]
    }
  ]
};
