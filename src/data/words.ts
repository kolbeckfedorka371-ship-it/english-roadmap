export interface Word {
  id: number
  word: string
  phonetic: string
  pos: string
  defEn: string
  defZh: string
  cefr: string
  example: string
  exampleZh: string
  tags?: string[] // 主题标签
}

export const allWords: Word[] = [
  // ===== A0 启蒙词汇 =====
  { id:1, word:'hello', phonetic:'/həˈloʊ/', pos:'interj.', defEn:'Used as a greeting', defZh:'你好（用于问候）', cefr:'A0', example:'Hello, how are you?', exampleZh:'你好，你好吗？', tags:['问候'] },
  { id:2, word:'goodbye', phonetic:'/ɡʊdˈbaɪ/', pos:'interj.', defEn:'Used when leaving', defZh:'再见', cefr:'A0', example:'Goodbye, see you tomorrow!', exampleZh:'再见，明天见！', tags:['问候'] },
  { id:3, word:'please', phonetic:'/pliːz/', pos:'adv.', defEn:'Used to make a polite request', defZh:'请', cefr:'A0', example:'Please sit down.', exampleZh:'请坐。', tags:['礼貌'] },
  { id:4, word:'thank', phonetic:'/θæŋk/', pos:'v.', defEn:'To express gratitude', defZh:'感谢', cefr:'A0', example:'Thank you very much.', exampleZh:'非常感谢你。', tags:['礼貌'] },
  { id:5, word:'sorry', phonetic:'/ˈsɒri/', pos:'adj.', defEn:'Feeling regret or sympathy', defZh:'对不起；抱歉', cefr:'A0', example:'I\'m sorry I\'m late.', exampleZh:'对不起我迟到了。', tags:['礼貌'] },
  { id:6, word:'water', phonetic:'/ˈwɔːtər/', pos:'n.', defEn:'A clear liquid', defZh:'水', cefr:'A0', example:'Can I have some water?', exampleZh:'我能要些水吗？', tags:['生活'] },
  { id:7, word:'food', phonetic:'/fuːd/', pos:'n.', defEn:'Any substance that people eat', defZh:'食物', cefr:'A0', example:'The food is delicious.', exampleZh:'食物很好吃。', tags:['生活'] },
  { id:8, word:'family', phonetic:'/ˈfæməli/', pos:'n.', defEn:'A group of related people', defZh:'家庭', cefr:'A0', example:'I love my family.', exampleZh:'我爱我的家庭。', tags:['家庭'] },
  { id:9, word:'mother', phonetic:'/ˈmʌðər/', pos:'n.', defEn:'A female parent', defZh:'妈妈', cefr:'A0', example:'My mother is a teacher.', exampleZh:'我妈妈是一名老师。', tags:['家庭'] },
  { id:10, word:'father', phonetic:'/ˈfɑːðər/', pos:'n.', defEn:'A male parent', defZh:'爸爸', cefr:'A0', example:'My father works in a bank.', exampleZh:'我爸爸在银行工作。', tags:['家庭'] },

  // ===== A1 基础词汇 =====
  { id:11, word:'introduce', phonetic:'/ˌɪntrəˈduːs/', pos:'v.', defEn:'To present someone by name', defZh:'介绍', cefr:'A1', example:'Let me introduce myself.', exampleZh:'让我介绍一下自己。', tags:['社交'] },
  { id:12, word:'friend', phonetic:'/frend/', pos:'n.', defEn:'A person you like and trust', defZh:'朋友', cefr:'A1', example:'She is my best friend.', exampleZh:'她是我最好的朋友。', tags:['社交'] },
  { id:13, word:'beautiful', phonetic:'/ˈbjuːtɪfl/', pos:'adj.', defEn:'Very attractive or pleasing', defZh:'美丽的', cefr:'A1', example:'What a beautiful day!', exampleZh:'多么美好的一天！', tags:['描述'] },
  { id:14, word:'important', phonetic:'/ɪmˈpɔːrtnt/', pos:'adj.', defEn:'Having great value or significance', defZh:'重要的', cefr:'A1', example:'This is very important.', exampleZh:'这非常重要。', tags:['描述'] },
  { id:15, word:'restaurant', phonetic:'/ˈrestrɒnt/', pos:'n.', defEn:'A place where you eat meals', defZh:'餐厅', cefr:'A1', example:'Let\'s go to a restaurant.', exampleZh:'我们去餐厅吧。', tags:['生活'] },
  { id:16, word:'direction', phonetic:'/dəˈrekʃn/', pos:'n.', defEn:'The way to go', defZh:'方向', cefr:'A1', example:'Can you give me directions?', exampleZh:'你能给我指路吗？', tags:['交通'] },
  { id:17, word:'time', phonetic:'/taɪm/', pos:'n.', defEn:'The ongoing sequence of events', defZh:'时间', cefr:'A1', example:'What time is it?', exampleZh:'几点了？', tags:['时间'] },
  { id:18, word:'morning', phonetic:'/ˈmɔːrnɪŋ/', pos:'n.', defEn:'The early part of the day', defZh:'早上', cefr:'A1', example:'Good morning!', exampleZh:'早上好！', tags:['时间'] },
  { id:19, word:'language', phonetic:'/ˈlæŋɡwɪdʒ/', pos:'n.', defEn:'A system of communication', defZh:'语言', cefr:'A1', example:'English is a beautiful language.', exampleZh:'英语是一门美丽的语言。', tags:['学习'] },
  { id:20, word:'learn', phonetic:'/lɜːrn/', pos:'v.', defEn:'To gain knowledge or skill', defZh:'学习', cefr:'A1', example:'I want to learn English.', exampleZh:'我想学英语。', tags:['学习'] },

  // ===== A2 中级词汇 =====
  { id:21, word:'experience', phonetic:'/ɪkˈspɪriəns/', pos:'n.', defEn:'Something that happens to you', defZh:'经历；经验', cefr:'A2', example:'It was a great experience.', exampleZh:'那是一次很棒的经历。', tags:['生活'] },
  { id:22, word:'opportunity', phonetic:'/ˌɒpərˈtjuːnəti/', pos:'n.', defEn:'A chance to do something', defZh:'机会', cefr:'A2', example:'This is a great opportunity.', exampleZh:'这是一个好机会。', tags:['生活'] },
  { id:23, word:'success', phonetic:'/səkˈses/', pos:'n.', defEn:'The achievement of a goal', defZh:'成功', cefr:'A2', example:'Hard work leads to success.', exampleZh:'努力工作带来成功。', tags:['生活'] },
  { id:24, word:'problem', phonetic:'/ˈprɒbləm/', pos:'n.', defEn:'A difficulty that needs a solution', defZh:'问题', cefr:'A2', example:'We need to solve this problem.', exampleZh:'我们需要解决这个问题。', tags:['生活'] },
  { id:25, word:'difference', phonetic:'/ˈdɪfrəns/', pos:'n.', defEn:'The way in which things are not the same', defZh:'区别；不同', cefr:'A2', example:'What\'s the difference?', exampleZh:'有什么区别？', tags:['描述'] },
  { id:26, word:'remember', phonetic:'/rɪˈmembər/', pos:'v.', defEn:'To recall from memory', defZh:'记住；回忆', cefr:'A2', example:'I remember you.', exampleZh:'我记得你。', tags:['心理'] },
  { id:27, word:'understand', phonetic:'/ˌʌndərˈstænd/', pos:'v.', defEn:'To know the meaning of', defZh:'理解', cefr:'A2', example:'I understand now.', exampleZh:'我现在明白了。', tags:['学习'] },
  { id:28, word:'believe', phonetic:'/bɪˈliːv/', pos:'v.', defEn:'To accept as true', defZh:'相信', cefr:'A2', example:'I believe in you.', exampleZh:'我相信你。', tags:['心理'] },
  { id:29, word:'imagine', phonetic:'/ɪˈmædʒɪn/', pos:'v.', defEn:'To form a picture in your mind', defZh:'想象', cefr:'A2', example:'Imagine a better world.', exampleZh:'想象一个更好的世界。', tags:['心理'] },
  { id:30, word:'create', phonetic:'/kriˈeɪt/', pos:'v.', defEn:'To make something new', defZh:'创造', cefr:'A2', example:'Artists create beautiful things.', exampleZh:'艺术家创造美丽的事物。', tags:['动作'] },

  // ===== B1 高中词汇 =====
  { id:31, word:'commencement', phonetic:'/kəˈmensmənt/', pos:'n.', defEn:'A graduation ceremony', defZh:'毕业典礼', cefr:'B1', example:'I\'m honored to be at your commencement.', exampleZh:'很荣幸参加你们的毕业典礼。', tags:['教育'] },
  { id:32, word:'honored', phonetic:'/ˈɒnərd/', pos:'adj.', defEn:'Feeling proud and privileged', defZh:'感到荣幸的', cefr:'B1', example:'I\'m honored to be with you today.', exampleZh:'今天和你们在一起我感到很荣幸。', tags:['情感'] },
  { id:33, word:'graduate', phonetic:'/ˈɡrædʒuːeɪt/', pos:'v.', defEn:'To complete a course of study', defZh:'毕业', cefr:'B1', example:'I never graduated from college.', exampleZh:'我从未大学毕业。', tags:['教育'] },
  { id:34, word:'demonstration', phonetic:'/ˌdemənˈstreɪʃn/', pos:'n.', defEn:'A public gathering expressing opinion', defZh:'示威；展示', cefr:'B1', example:'The greatest demonstration for freedom.', exampleZh:'最伟大的自由示威。', tags:['政治'] },
  { id:35, word:'inspire', phonetic:'/ɪnˈspaɪər/', pos:'v.', defEn:'To fill with creative urge', defZh:'激励；启发', cefr:'B1', example:'How great leaders inspire action.', exampleZh:'伟大的领导者如何激励行动。', tags:['领导力'] },
  { id:36, word:'creativity', phonetic:'/ˌkriːeɪˈtɪvəti/', pos:'n.', defEn:'The ability to create new things', defZh:'创造力', cefr:'B1', example:'Do schools kill creativity?', exampleZh:'学校扼杀创造力吗？', tags:['教育'] },
  { id:37, word:'confidence', phonetic:'/ˈkɒnfɪdəns/', pos:'n.', defEn:'Belief in oneself', defZh:'信心；自信', cefr:'B1', example:'The skill of self-confidence.', exampleZh:'自信的技能。', tags:['心理'] },
  { id:38, word:'passion', phonetic:'/ˈpæʃn/', pos:'n.', defEn:'A very strong feeling of enthusiasm', defZh:'热情；激情', cefr:'B1', example:'Follow your passion.', exampleZh:'追随你的热情。', tags:['情感'] },
  { id:39, word:'struggle', phonetic:'/ˈstrʌɡl/', pos:'v./n.', defEn:'To try hard with difficulty', defZh:'挣扎；奋斗', cefr:'B1', example:'Life is a beautiful struggle.', exampleZh:'人生是一场美丽的挣扎。', tags:['生活'] },
  { id:40, word:'achieve', phonetic:'/əˈtʃiːv/', pos:'v.', defEn:'To reach a goal', defZh:'实现；达到', cefr:'B1', example:'You can achieve anything.', exampleZh:'你能实现任何目标。', tags:['生活'] },
  { id:41, word:'failure', phonetic:'/ˈfeɪljər/', pos:'n.', defEn:'Lack of success', defZh:'失败', cefr:'B1', example:'Failure is not the opposite of success.', exampleZh:'失败不是成功的对立面。', tags:['生活'] },
  { id:42, word:'courage', phonetic:'/ˈkʌrɪdʒ/', pos:'n.', defEn:'Bravery in the face of fear', defZh:'勇气', cefr:'B1', example:'It takes courage to follow your dreams.', exampleZh:'追随梦想需要勇气。', tags:['品质'] },
  { id:43, word:'freedom', phonetic:'/ˈfriːdəm/', pos:'n.', defEn:'The state of being free', defZh:'自由', cefr:'B1', example:'Freedom is not free.', exampleZh:'自由不是免费的。', tags:['政治'] },
  { id:44, word:'democracy', phonetic:'/dɪˈmɒkrəsi/', pos:'n.', defEn:'Government by the people', defZh:'民主', cefr:'B1', example:'The power of our democracy.', exampleZh:'我们民主的力量。', tags:['政治'] },
  { id:45, word:'surrender', phonetic:'/səˈrendər/', pos:'v.', defEn:'To give up', defZh:'投降', cefr:'B1', example:'We shall never surrender.', exampleZh:'我们永远不会投降。', tags:['军事'] },

  // ===== B2 四级词汇 =====
  { id:46, word:'vulnerability', phonetic:'/ˌvʌlnərəˈbɪləti/', pos:'n.', defEn:'The quality of being exposed to harm', defZh:'脆弱性', cefr:'B2', example:'The power of vulnerability.', exampleZh:'脆弱的力量。', tags:['心理'] },
  { id:47, word:'assume', phonetic:'/əˈsjuːm/', pos:'v.', defEn:'To accept as true without proof', defZh:'假设；认为', cefr:'B2', example:'When things don\'t go as we assume.', exampleZh:'当事情不像我们假设的那样发展时。', tags:['思维'] },
  { id:48, word:'motivation', phonetic:'/ˌməʊtɪˈveɪʃn/', pos:'n.', defEn:'The reason for acting', defZh:'动机；动力', cefr:'B2', example:'The puzzle of motivation.', exampleZh:'动机之谜。', tags:['心理'] },
  { id:49, word:'perseverance', phonetic:'/ˌpɜːrsəˈvɪrəns/', pos:'n.', defEn:'Persistence in doing something', defZh:'毅力；坚持不懈', cefr:'B2', example:'Grit: the power of passion and perseverance.', exampleZh:'毅力：热情和坚持的力量。', tags:['品质'] },
  { id:50, word:'revolution', phonetic:'/ˌrevəˈluːʃn/', pos:'n.', defEn:'A fundamental change', defZh:'革命；变革', cefr:'B2', example:'The biggest technology revolution.', exampleZh:'最大的技术革命。', tags:['社会'] },
  { id:51, word:'civilization', phonetic:'/ˌsɪvəlaɪˈzeɪʃn/', pos:'n.', defEn:'An advanced state of human society', defZh:'文明', cefr:'B2', example:'A long-term civilization.', exampleZh:'长期文明。', tags:['社会'] },
  { id:52, word:'infectious', phonetic:'/ɪnˈfekʃəs/', pos:'adj.', defEn:'Likely to spread to others', defZh:'传染性的', cefr:'B2', example:'A highly infectious virus.', exampleZh:'一种高传染性病毒。', tags:['健康'] },
  { id:53, word:'cognitive', phonetic:'/ˈkɒɡnətɪv/', pos:'adj.', defEn:'Related to thinking and knowing', defZh:'认知的', cefr:'B2', example:'Cognitive biases lead us astray.', exampleZh:'认知偏见导致我们误入歧途。', tags:['心理'] },
  { id:54, word:'probability', phonetic:'/ˌprɒbəˈbɪləti/', pos:'n.', defEn:'The likelihood of something happening', defZh:'概率；可能性', cefr:'B2', example:'The probability is much higher.', exampleZh:'概率高得多。', tags:['数学'] },
  { id:55, word:'transformative', phonetic:'/trænsˈfɔːrmətɪv/', pos:'adj.', defEn:'Causing a major change', defZh:'有变革性的', cefr:'B2', example:'The most transformative technology.', exampleZh:'最具变革性的技术。', tags:['描述'] },

  // ===== C1 六级词汇 =====
  { id:56, word:'humanity', phonetic:'/hjuːˈmænəti/', pos:'n.', defEn:'All human beings collectively', defZh:'人类', cefr:'C1', example:'Humanity has ever created.', exampleZh:'人类有史以来创造的。', tags:['人类'] },
  { id:57, word:'misjudgment', phonetic:'/mɪsˈdʒʌdʒmənt/', pos:'n.', defEn:'An incorrect assessment', defZh:'误判', cefr:'C1', example:'The psychology of human misjudgment.', exampleZh:'人类误判心理学。', tags:['心理'] },
  { id:58, word:'multi-planet', phonetic:'/ˌmʌltiˈplænɪt/', pos:'adj.', defEn:'Involving multiple planets', defZh:'多星球的', cefr:'C1', example:'A multi-planet species.', exampleZh:'多星球物种。', tags:['科技'] },
  { id:59, word:'revolutionary', phonetic:'/ˌrevəˈluːʃənəri/', pos:'adj.', defEn:'Involving a complete change', defZh:'革命性的', cefr:'C1', example:'A revolutionary product.', exampleZh:'一款革命性产品。', tags:['描述'] },
  { id:60, word:'despair', phonetic:'/dɪˈspeər/', pos:'n.', defEn:'The complete loss of hope', defZh:'绝望', cefr:'C1', example:'In the midst of despair, look for hope.', exampleZh:'在绝望中寻找希望。', tags:['情感'] },
  { id:61, word:'philosophy', phonetic:'/fɪˈlɒsəfi/', pos:'n.', defEn:'The study of fundamental questions', defZh:'哲学', cefr:'C1', example:'Naval\'s philosophy on wealth.', exampleZh:'Naval 关于财富的哲学。', tags:['学术'] },
  { id:62, word:'paradox', phonetic:'/ˈpærədɒks/', pos:'n.', defEn:'A seemingly contradictory statement', defZh:'悖论；矛盾', cefr:'C1', example:'The paradox of choice.', exampleZh:'选择的悖论。', tags:['思维'] },
  { id:63, word:'empirical', phonetic:'/ɪmˈpɪrɪkl/', pos:'adj.', defEn:'Based on observation and experiment', defZh:'经验主义的', cefr:'C1', example:'Empirical evidence shows that...', exampleZh:'经验证据表明...', tags:['学术'] },
  { id:64, word:'unprecedented', phonetic:'/ʌnˈpresɪdentɪd/', pos:'adj.', defEn:'Never done or known before', defZh:'前所未有的', cefr:'C1', example:'This is an unprecedented challenge.', exampleZh:'这是一个前所未有的挑战。', tags:['描述'] },
  { id:65, word:'resilience', phonetic:'/rɪˈzɪliəns/', pos:'n.', defEn:'The ability to recover from difficulties', defZh:'韧性；恢复力', cefr:'C1', example:'Resilience is the key to success.', exampleZh:'韧性是成功的关键。', tags:['品质'] },

  // ===== 补充：名人相关词汇 =====
  { id:66, word:'entrepreneur', phonetic:'/ˌɒntrəprəˈnɜːr/', pos:'n.', defEn:'A person who starts a business', defZh:'企业家；创业者', cefr:'B2', example:'He is a successful entrepreneur.', exampleZh:'他是一位成功的企业家。', tags:['商业'] },
  { id:67, word:'innovation', phonetic:'/ˌɪnəˈveɪʃn/', pos:'n.', defEn:'A new idea or method', defZh:'创新', cefr:'B1', example:'Innovation distinguishes leaders from followers.', exampleZh:'创新区分了领导者和追随者。', tags:['商业'] },
  { id:68, word:'persevere', phonetic:'/ˌpɜːrsəˈvɪr/', pos:'v.', defEn:'To continue despite difficulty', defZh:'坚持不懈', cefr:'B2', example:'You must persevere through challenges.', exampleZh:'你必须坚持度过挑战。', tags:['品质'] },
  { id:69, word:'destiny', phonetic:'/ˈdestɪni/', pos:'n.', defEn:'What happens in the future', defZh:'命运', cefr:'B1', example:'You control your own destiny.', exampleZh:'你掌控自己的命运。', tags:['哲学'] },
  { id:70, word:'curiosity', phonetic:'/ˌkjʊəriˈɒsəti/', pos:'n.', defEn:'A strong desire to know', defZh:'好奇心', cefr:'B1', example:'Curiosity is the engine of achievement.', exampleZh:'好奇心是成就的引擎。', tags:['品质'] },

  // ===== 更多实用词汇 =====
  { id:71, word:'journey', phonetic:'/ˈdʒɜːrni/', pos:'n.', defEn:'The act of traveling from one place to another', defZh:'旅程', cefr:'A2', example:'Life is a journey, not a destination.', exampleZh:'人生是一段旅程，不是终点。', tags:['生活'] },
  { id:72, word:'challenge', phonetic:'/ˈtʃælɪndʒ/', pos:'n.', defEn:'Something difficult that tests ability', defZh:'挑战', cefr:'A2', example:'Every challenge is an opportunity.', exampleZh:'每个挑战都是一个机会。', tags:['生活'] },
  { id:73, word:'decision', phonetic:'/dɪˈsɪʒn/', pos:'n.', defEn:'A choice that you make', defZh:'决定', cefr:'A2', example:'This is a difficult decision.', exampleZh:'这是一个艰难的决定。', tags:['生活'] },
  { id:74, word:'environment', phonetic:'/ɪnˈvaɪrənmənt/', pos:'n.', defEn:'The natural world around us', defZh:'环境', cefr:'B1', example:'Protect the environment.', exampleZh:'保护环境。', tags:['自然'] },
  { id:75, word:'technology', phonetic:'/tekˈnɒlədʒi/', pos:'n.', defEn:'Scientific knowledge used in practical ways', defZh:'技术；科技', cefr:'B1', example:'Technology changes everything.', exampleZh:'技术改变一切。', tags:['科技'] },
  { id:76, word:'education', phonetic:'/ˌedʒuˈkeɪʃn/', pos:'n.', defEn:'The process of learning', defZh:'教育', cefr:'A2', example:'Education is the key to success.', exampleZh:'教育是成功的关键。', tags:['教育'] },
  { id:77, word:'communication', phonetic:'/kəˌmjuːnɪˈkeɪʃn/', pos:'n.', defEn:'The exchange of information', defZh:'沟通；交流', cefr:'B1', example:'Good communication is essential.', exampleZh:'良好的沟通很重要。', tags:['社交'] },
  { id:78, word:'imagination', phonetic:'/ɪˌmædʒɪˈneɪʃn/', pos:'n.', defEn:'The ability to create pictures in your mind', defZh:'想象力', cefr:'B1', example:'Imagination is more important than knowledge.', exampleZh:'想象力比知识更重要。', tags:['心理'] },
  { id:79, word:'determination', phonetic:'/dɪˌtɜːrmɪˈneɪʃn/', pos:'n.', defEn:'Firmness of purpose', defZh:'决心', cefr:'B1', example:'With determination, anything is possible.', exampleZh:'有决心，一切皆有可能。', tags:['品质'] },
  { id:80, word:'knowledge', phonetic:'/ˈnɒlɪdʒ/', pos:'n.', defEn:'Information and understanding', defZh:'知识', cefr:'A2', example:'Knowledge is power.', exampleZh:'知识就是力量。', tags:['学习'] },
]
