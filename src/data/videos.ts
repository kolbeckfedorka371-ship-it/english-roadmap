export interface Sentence {
  id: number
  seq: number
  startSec: number
  endSec: number
  en: string
  zh: string
  keywords: string[]
}

export interface Video {
  id: number
  courseId: number
  stageId: number
  title: string
  speaker: string
  sourceType: 'youtube' | 'bilibili'
  sourceId: string
  duration: string
  cefr: string
  tags: string[]
  description: string
  sentences: Sentence[]
  isChineseOriginal?: boolean // 中文原声+英文翻译
}

let sid = 100
const s = (start: number, end: number, en: string, zh: string, kw: string[] = []): Sentence => ({
  id: sid++, seq: 0, startSec: start, endSec: end, en, zh, keywords: kw
})

export const allVideos: Video[] = [
  // ===== Stage 1: 英语启蒙 A0 =====
  { id: 1, courseId: 1, stageId: 1, title: '26个英文字母歌', speaker: 'English Roadmap',
    sourceType: 'youtube', sourceId: '75p-N9YKqNo', duration: '3:24', cefr: 'A0',
    tags: ['字母','发音','启蒙'], description: '通过歌曲学习26个英文字母的标准发音',
    sentences: [
      s(0,4,'A B C D E F G','A B C D E F G',['字母']),
      s(4,8,'H I J K L M N','H I J K L M N',['字母']),
      s(8,12,'O P Q R S T','O P Q R S T',['字母']),
      s(12,16,'U V W X Y Z','U V W X Y Z',['字母']),
      s(16,20,'Now I know my ABCs','现在我认识字母表了',['know','ABCs']),
      s(20,24,'Next time won\'t you sing with me','下次和我一起唱好吗',['next time','sing']),
    ] },
  { id: 2, courseId: 1, stageId: 1, title: '自然拼读入门 Phonics', speaker: 'English Roadmap',
    sourceType: 'youtube', sourceId: 'g8uQnIBTNpY', duration: '10:00', cefr: 'A0',
    tags: ['自然拼读','发音','基础'], description: '学习自然拼读的基本规则',
    sentences: [
      s(0,5,'Let\'s learn phonics!','让我们学习自然拼读！',['learn','phonics']),
      s(5,12,'A makes the sound /æ/','A 发 /æ/ 的音',['sound']),
      s(12,18,'Cat, bat, hat — they all rhyme!','Cat, bat, hat — 它们都押韵！',['rhyme']),
      s(18,25,'B makes the sound /b/','B 发 /b/ 的音',['sound']),
      s(25,32,'Ball, big, blue — wonderful!','Ball, big, blue — 太棒了！',['wonderful']),
    ] },
  { id: 3, courseId: 1, stageId: 1, title: '48个国际音标', speaker: 'English Roadmap',
    sourceType: 'youtube', sourceId: 'Yr1txsHsUak', duration: '15:00', cefr: 'A0',
    tags: ['音标','发音','基础'], description: '系统学习48个国际音标',
    sentences: [
      s(0,6,'There are 48 sounds in English','英语有48个音素',['sounds','English']),
      s(6,12,'20 vowel sounds and 28 consonant sounds','20个元音和28个辅音',['vowel','consonant']),
      s(12,18,'Let\'s start with the short vowels','让我们从短元音开始',['short vowels']),
    ] },
  { id: 4, courseId: 1, stageId: 1, title: '数字1-100英文说法', speaker: 'English Roadmap',
    sourceType: 'youtube', sourceId: 'y2K2YDypfnw', duration: '8:00', cefr: 'A0',
    tags: ['数字','基础','启蒙'], description: '学习1到100的英文表达',
    sentences: [
      s(0,4,'One, two, three, four, five','一、二、三、四、五',['one','two','three']),
      s(4,8,'Six, seven, eight, nine, ten','六、七、八、九、十',['six','seven','ten']),
      s(8,12,'Twenty, thirty, forty, fifty','二十、三十、四十、五十',['twenty','fifty']),
    ] },
  { id: 5, courseId: 1, stageId: 1, title: '颜色和形状英文', speaker: 'English Roadmap',
    sourceType: 'youtube', sourceId: 'B4FhmMDKw-s', duration: '6:00', cefr: 'A0',
    tags: ['颜色','形状','基础'], description: '学习常见颜色和形状的英文表达',
    sentences: [
      s(0,4,'Red, blue, green, yellow','红、蓝、绿、黄',['red','blue','green']),
      s(4,8,'Circle, square, triangle','圆形、方形、三角形',['circle','square','triangle']),
    ] },

  // ===== Stage 2: 生存英语 A1 =====
  { id: 6, courseId: 2, stageId: 2, title: 'English Greetings for Beginners', speaker: 'English Roadmap',
    sourceType: 'youtube', sourceId: 'FkEMSN9jUF4', duration: '8:00', cefr: 'A1',
    tags: ['问候','日常','基础'], description: '学习最常用的英语问候语',
    sentences: [
      s(0,4,'Hello! How are you?','你好！你怎么样？',['hello','how are you']),
      s(4,8,'I\'m fine, thank you.','我很好，谢谢。',['fine','thank you']),
      s(8,12,'What\'s your name?','你叫什么名字？',['what','name']),
      s(12,16,'My name is Tom. Nice to meet you.','我叫Tom。很高兴认识你。',['nice to meet you']),
      s(16,20,'Nice to meet you too!','我也很高兴认识你！',['too']),
    ] },
  { id: 7, courseId: 2, stageId: 2, title: 'How to Introduce Yourself', speaker: 'JenniferESL',
    sourceType: 'youtube', sourceId: 'V1bUHYOz2JI', duration: '12:00', cefr: 'A1',
    tags: ['自我介绍','日常','基础'], description: '学习如何用英语做自我介绍',
    sentences: [
      s(0,5,'Let me introduce myself','让我介绍一下自己',['introduce']),
      s(5,10,'I\'m from China.','我来自中国。',['from']),
      s(10,15,'I work as a teacher.','我是一名老师。',['work as']),
      s(15,20,'In my free time, I like reading.','空闲时间，我喜欢阅读。',['free time','like']),
    ] },
  { id: 8, courseId: 2, stageId: 2, title: 'Shopping English Conversation', speaker: 'EnglishLessons4U',
    sourceType: 'youtube', sourceId: 'v7BY7B7dcek', duration: '10:00', cefr: 'A1',
    tags: ['购物','日常','对话'], description: '购物场景实用英语对话',
    sentences: [
      s(0,5,'How much is this shirt?','这件衬衫多少钱？',['how much']),
      s(5,10,'It\'s twenty dollars.','二十美元。',['twenty dollars']),
      s(10,15,'Can I try it on?','我能试穿吗？',['try on']),
      s(15,20,'The fitting room is over there.','试衣间在那边。',['fitting room']),
    ] },
  { id: 9, courseId: 2, stageId: 2, title: 'Asking for Directions', speaker: 'BBC Learning English',
    sourceType: 'youtube', sourceId: 'YgpPsAZPRm4', duration: '8:00', cefr: 'A1',
    tags: ['问路','交通','日常'], description: '学习如何用英语问路',
    sentences: [
      s(0,5,'Excuse me, where is the nearest subway station?','请问最近的地铁站在哪里？',['excuse me','where','subway']),
      s(5,10,'Go straight and turn left at the traffic light.','直走，在红绿灯处左转。',['go straight','turn left','traffic light']),
      s(10,15,'It\'s about five minutes on foot.','步行大约五分钟。',['on foot']),
    ] },
  { id: 10, courseId: 2, stageId: 2, title: 'At the Restaurant', speaker: 'English with Lucy',
    sourceType: 'youtube', sourceId: 'zKRh媄lMJ8', duration: '12:00', cefr: 'A1',
    tags: ['餐厅','饮食','日常'], description: '餐厅点餐实用英语',
    sentences: [
      s(0,5,'A table for two, please.','请给我一张两人桌。',['table for two']),
      s(5,10,'Can I see the menu?','我能看看菜单吗？',['menu']),
      s(10,15,'I\'d like to order the steak.','我想点牛排。',['would like','order','steak']),
    ] },
  { id: 11, courseId: 2, stageId: 2, title: 'Telling Time in English', speaker: 'English Roadmap',
    sourceType: 'youtube', sourceId: 'tAlFh9i6lnY', duration: '7:00', cefr: 'A1',
    tags: ['时间','数字','基础'], description: '学习用英语表达时间',
    sentences: [
      s(0,5,'What time is it?','几点了？',['what time']),
      s(5,10,'It\'s three o\'clock.','三点整。',['o\'clock']),
      s(10,15,'It\'s half past five.','五点半。',['half past']),
    ] },
  { id: 12, courseId: 2, stageId: 2, title: 'Family Members in English', speaker: 'English Roadmap',
    sourceType: 'youtube', sourceId: 'lv2qMR3YeaI', duration: '8:00', cefr: 'A1',
    tags: ['家庭','称呼','基础'], description: '学习家庭成员的英文称呼',
    sentences: [
      s(0,5,'This is my mother.','这是我妈妈。',['mother']),
      s(5,10,'That is my father.','那是我爸爸。',['father']),
      s(10,15,'These are my brothers and sisters.','这些是我的兄弟姐妹。',['brothers','sisters']),
    ] },

  // ===== Stage 3: 初中英语 A2 =====
  { id: 13, courseId: 3, stageId: 3, title: 'English Basic Sentence Structure', speaker: 'English with Lucy',
    sourceType: 'youtube', sourceId: 'rtLMAFnamic', duration: '15:00', cefr: 'A2',
    tags: ['语法','句子','基础'], description: '英语的基本句子结构',
    sentences: [
      s(0,5,'Every English sentence needs a subject and a verb','每个英语句子都需要主语和动词',['subject','verb']),
      s(5,10,'I love English.','我喜欢英语。',['love']),
      s(10,15,'She reads books every day.','她每天读书。',['reads','every day']),
    ] },
  { id: 14, courseId: 3, stageId: 3, title: 'Present Simple vs Present Continuous', speaker: 'BBC Learning English',
    sourceType: 'youtube', sourceId: 'xSvcMCQ1EMA', duration: '10:00', cefr: 'A2',
    tags: ['语法','时态','基础'], description: '一般现在时 vs 现在进行时',
    sentences: [
      s(0,6,'I eat breakfast every morning.','我每天早上吃早饭。',['eat','every morning']),
      s(6,12,'Right now, I\'m eating lunch.','现在，我正在吃午饭。',['right now','eating']),
      s(12,18,'She works in a bank.','她在银行工作。',['works']),
      s(18,24,'She is working from home today.','她今天在家工作。',['working from home']),
    ] },
  { id: 15, courseId: 3, stageId: 3, title: 'Past Tense Regular Verbs', speaker: 'English with Lucy',
    sourceType: 'youtube', sourceId: 'dXqJfMFANJI', duration: '12:00', cefr: 'A2',
    tags: ['语法','过去时','基础'], description: '规则动词的过去式',
    sentences: [
      s(0,5,'I walked to school yesterday.','我昨天走路去学校。',['walked','yesterday']),
      s(5,10,'She played tennis last week.','她上周打了网球。',['played','last week']),
      s(10,15,'We watched a movie last night.','我们昨晚看了电影。',['watched','last night']),
    ] },
  { id: 16, courseId: 3, stageId: 3, title: 'Comparative and Superlative', speaker: 'BBC Learning English',
    sourceType: 'youtube', sourceId: 'VY2FCGVjyBQ', duration: '10:00', cefr: 'A2',
    tags: ['语法','比较级','基础'], description: '比较级和最高级',
    sentences: [
      s(0,5,'She is taller than her sister.','她比她姐姐高。',['taller','than']),
      s(5,10,'This is the best restaurant in town.','这是城里最好的餐厅。',['best']),
    ] },

  // ===== Stage 4: 高中英语 B1 — 经典演讲 =====
  { id: 17, courseId: 4, stageId: 4, title: 'Steve Jobs Stanford 毕业演讲', speaker: 'Steve Jobs',
    sourceType: 'youtube', sourceId: 'UF8uR6Z6KLc', duration: '15:04', cefr: 'B1',
    tags: ['演讲','励志','科技','经典'], description: '2005年斯坦福大学毕业典礼演讲，讲述三个关于人生的故事',
    sentences: [
      s(0,6,'Thank you. I\'m honored to be with you today','谢谢。很荣幸今天和你们在一起',['honored']),
      s(7,14,'for your commencement from one of the finest universities in the world.','参加你们从世界顶尖大学毕业的典礼',['commencement','finest']),
      s(15,22,'I never graduated from college.','我从未大学毕业。',['graduated']),
      s(23,30,'Truth be told, this is the closest I\'ve ever gotten to a college graduation.','说实话，这是我离大学毕业最近的一次',['truth be told','closest']),
      s(31,38,'Today I want to tell you three stories from my life.','今天我想告诉你我人生中的三个故事。',['three stories']),
      s(39,46,'That\'s it. No big deal. Just three stories.','就这样。没什么大不了的。就三个故事。',['no big deal']),
    ] },
  { id: 18, courseId: 4, stageId: 4, title: 'Martin Luther King - I Have a Dream', speaker: 'Martin Luther King Jr.',
    sourceType: 'youtube', sourceId: 'vP4iYrTtOOY', duration: '17:28', cefr: 'B1',
    tags: ['演讲','历史','人权','经典'], description: '1963年华盛顿大游行上的历史性演讲',
    sentences: [
      s(0,6,'I am happy to join with you today','今天我很高兴和大家一起',['join']),
      s(7,14,'in what will go down in history as the greatest demonstration for freedom','参加这场将载入史册的最伟大的自由示威',['demonstration','freedom']),
      s(15,22,'in the history of our nation.','在我们国家的历史上。',['nation']),
      s(23,32,'I have a dream that one day this nation will rise up','我有一个梦想，有一天这个国家会站起来',['dream','rise up']),
    ] },
  { id: 19, courseId: 4, stageId: 4, title: 'J.K. Rowling 哈佛演讲', speaker: 'J.K. Rowling',
    sourceType: 'youtube', sourceId: 'wHGqp8lz364', duration: '20:00', cefr: 'B1',
    tags: ['演讲','励志','文学','经典'], description: '2008年哈佛大学毕业典礼演讲，关于失败和想象力',
    sentences: [
      s(0,7,'President Faust, members of the Harvard Corporation','Faust校长，哈佛公司成员们',['president','corporation']),
      s(8,15,'and the Board of Overseers, members of the faculty','和监事会成员们，教职员工们',['board','faculty']),
      s(16,23,'proud parents, discriminating graduates','骄傲的父母们，有鉴赏力的毕业生们',['proud','discriminating']),
    ] },
  { id: 20, courseId: 4, stageId: 4, title: 'Obama Victory Speech 2008', speaker: 'Barack Obama',
    sourceType: 'youtube', sourceId: 'Djlc_TRvBwY', duration: '17:00', cefr: 'B1',
    tags: ['演讲','政治','历史','经典'], description: '2008年美国总统大选胜选演讲',
    sentences: [
      s(0,7,'If there is anyone out there who doubts that America is a place where anything is possible','如果有人怀疑美国是一个一切皆有可能的地方',['doubts','possible']),
      s(8,15,'who still wonders if the dream of our founders is alive in our time','仍然怀疑我们建国者的梦想在我们这个时代是否还活着',['founders','alive']),
      s(16,23,'who still questions the power of our democracy','仍然质疑我们民主的力量',['questions','democracy']),
      s(24,30,'tonight is your answer.','今晚就是你的答案。',['answer']),
    ] },
  { id: 21, courseId: 4, stageId: 4, title: 'Winston Churchill - We Shall Fight', speaker: 'Winston Churchill',
    sourceType: 'youtube', sourceId: 'MpukJt9E6SU', duration: '12:00', cefr: 'B1',
    tags: ['演讲','历史','战争','经典'], description: '1940年丘吉尔在下议院的著名演讲',
    sentences: [
      s(0,7,'We shall fight on the beaches','我们将在海滩上战斗',['fight','beaches']),
      s(7,14,'we shall fight on the landing grounds','我们将在登陆场上战斗',['landing grounds']),
      s(14,21,'we shall fight in the fields and in the streets','我们将在田野和街道上战斗',['fields','streets']),
      s(21,28,'we shall never surrender','我们永远不会投降',['never','surrender']),
    ] },

  // ===== Stage 4: 中文原声 + 英文翻译 =====
  { id: 22, courseId: 4, stageId: 4, title: '马云：如果你不尝试，你永远不知道', speaker: 'Jack Ma 马云',
    sourceType: 'bilibili', sourceId: 'BV1Ws411b7xf', duration: '8:00', cefr: 'B1',
    tags: ['演讲','创业','中文原声','经典'], description: '马云经典演讲：关于创业和坚持（中文原声，英文字幕）',
    isChineseOriginal: true,
    sentences: [
      s(0,6,'If you don\'t try, you will never know.','如果你不尝试，你永远不知道。',['try','never know']),
      s(6,12,'Today is very hard, tomorrow will be worse.','今天很残酷，明天更残酷。',['hard','worse']),
      s(12,18,'But the day after tomorrow will be wonderful.','但后天会很美好。',['wonderful']),
      s(18,24,'Most people die tomorrow evening.','大多数人死在明天晚上。',['die','evening']),
      s(24,30,'Only those who really believe can see the day after tomorrow.','只有真正相信的人才能看到后天。',['believe']),
    ] },
  { id: 23, courseId: 4, stageId: 4, title: '任正非：华为的冬天', speaker: 'Ren Zhengfei 任正非',
    sourceType: 'bilibili', sourceId: 'BV1hW411Q7xf', duration: '10:00', cefr: 'B1',
    tags: ['演讲','管理','中文原声','经典'], description: '任正非经典文章《华为的冬天》节选（中文原声）',
    isChineseOriginal: true,
    sentences: [
      s(0,7,'Huawei\'s winter is coming.','华为的冬天来了。',['winter','coming']),
      s(7,14,'We must prepare for the worst before it happens.','我们必须在最坏的情况发生之前做好准备。',['prepare','worst']),
      s(14,21,'If you don\'t feel the crisis, you will be eliminated.','如果你感觉不到危机，你就会被淘汰。',['crisis','eliminated']),
    ] },
  { id: 24, courseId: 4, stageId: 4, title: '刘强东：不要假装很努力', speaker: 'Liu Qiangdong 刘强东',
    sourceType: 'bilibili', sourceId: 'BV1Ut411Y7xf', duration: '6:00', cefr: 'B1',
    tags: ['演讲','创业','中文原声'], description: '刘强东谈创业和执行力（中文原声）',
    isChineseOriginal: true,
    sentences: [
      s(0,6,'Don\'t pretend to work hard.','不要假装很努力。',['pretend','work hard']),
      s(6,12,'Results don\'t lie.','结果不会骗人。',['results','lie']),
      s(12,18,'Execution is everything.','执行力就是一切。',['execution','everything']),
    ] },

  // ===== Stage 5: CET-4 B2 — TED精選 =====
  { id: 25, courseId: 5, stageId: 5, title: 'How Great Leaders Inspire Action', speaker: 'Simon Sinek',
    sourceType: 'youtube', sourceId: 'qp0HIF3SfI4', duration: '18:34', cefr: 'B2',
    tags: ['TED','领导力','商业','经典'], description: 'Simon Sinek 的经典 TED 演讲，解释伟大的领导者如何激励行动',
    sentences: [
      s(0,7,'How do you explain when things don\'t go as we assume?','当事情不像我们假设的那样发展时，你怎么解释？',['explain','assume']),
      s(8,16,'Or better, how do you explain when others are able to achieve things','或者更好的是，你怎么解释当别人能够取得成就',['achieve']),
      s(17,24,'that seem to defy all of the assumptions?','似乎违背了所有假设？',['defy','assumptions']),
    ] },
  { id: 26, courseId: 5, stageId: 5, title: 'The Power of Vulnerability', speaker: 'Brené Brown',
    sourceType: 'youtube', sourceId: 'iCvmsMoslHQ', duration: '20:00', cefr: 'B2',
    tags: ['TED','心理学','人性','经典'], description: 'Brené Brown 关于脆弱的力量的 TED 演讲',
    sentences: [
      s(0,6,'So, I\'ll start with this: a couple years ago','那么，我从这里开始：几年前',['couple']),
      s(7,14,'an event planner called me because I was going to do a speaking event.','一个活动策划人给我打电话，因为我要做一个演讲活动。',['event planner','speaking event']),
    ] },
  { id: 27, courseId: 5, stageId: 5, title: 'Do Schools Kill Creativity?', speaker: 'Sir Ken Robinson',
    sourceType: 'youtube', sourceId: 'iG9CE55wbtY', duration: '19:24', cefr: 'B2',
    tags: ['TED','教育','创造力','经典'], description: 'TED 历史上观看次数最多的演讲之一',
    sentences: [
      s(0,7,'Good morning. How are you? It\'s been great, hasn\'t it?','早上好。大家好吗？很棒，对吧？',['great']),
      s(8,16,'I\'ve been blown away by the whole thing.','整个活动让我非常震撼。',['blown away']),
    ] },
  { id: 28, courseId: 5, stageId: 5, title: 'Your Body Language May Shape Who You Are', speaker: 'Amy Cuddy',
    sourceType: 'youtube', sourceId: 'Ks-_Mh1QhMc', duration: '21:02', cefr: 'B2',
    tags: ['TED','心理学','身体语言'], description: 'Amy Cuddy 关于肢体语言如何影响你的 TED 演讲',
    sentences: [
      s(0,7,'So I want to start by offering you a free no-tech life hack','我想从一个免费的、无需技术的生活小窍门开始',['life hack']),
      s(8,15,'that all it requires of you is that you change your posture for two minutes.','只需要你改变两分钟的姿势。',['posture','change']),
    ] },
  { id: 29, courseId: 5, stageId: 5, title: 'The Puzzle of Motivation', speaker: 'Dan Pink',
    sourceType: 'youtube', sourceId: 'rrkrvAUbU9Y', duration: '18:36', cefr: 'B2',
    tags: ['TED','商业','动机','经典'], description: 'Dan Pink 关于激励的 TED 演讲',
    sentences: [
      s(0,7,'I need to make a confession at the outset here.','我需要在这里先做一个坦白。',['confession','outset']),
      s(8,15,'A little over 20 years ago, I did something that I regret.','大约20多年前，我做了一件让我后悔的事。',['regret']),
    ] },
  { id: 30, courseId: 5, stageId: 5, title: 'Grit: The Power of Passion and Perseverance', speaker: 'Angela Duckworth',
    sourceType: 'youtube', sourceId: 'H14bBuluwB8', duration: '6:12', cefr: 'B2',
    tags: ['TED','教育','毅力','经典'], description: 'Angela Duckworth 关于毅力的 TED 演讲',
    sentences: [
      s(0,7,'When I was 27 years old, I left a very demanding job','我27岁时，辞掉了一份要求很高的工作',['demanding']),
      s(8,15,'in management consulting, for a job that was even more demanding: teaching.','辞掉了管理咨询的工作，去做一份要求更高的工作：教学。',['consulting','teaching']),
    ] },
  { id: 31, courseId: 5, stageId: 5, title: 'The Happy Secret to Better Work', speaker: 'Shawn Achor',
    sourceType: 'youtube', sourceId: 'GXy__kgebH4', duration: '12:20', cefr: 'B2',
    tags: ['TED','心理学','幸福','工作'], description: 'Shawn Achor 关于快乐与工作的 TED 演讲',
    sentences: [
      s(0,7,'When I was seven years old, I fell off the top bunk bed.','我七岁时，从上铺掉了下来。',['bunk bed']),
      s(8,15,'My sister tried to stop my fall, but she was too late.','我姐姐试图阻止我掉下来，但她太晚了。',['stop','fall']),
    ] },
  { id: 32, courseId: 5, stageId: 5, title: 'How to Speak So That People Want to Listen', speaker: 'Julian Treasure',
    sourceType: 'youtube', sourceId: 'eIho2S0ZahI', duration: '9:58', cefr: 'B2',
    tags: ['TED','沟通','演讲技巧'], description: 'Julian Treasure 教你如何说话让人愿意听',
    sentences: [
      s(0,7,'The human voice: it\'s the instrument we all play.','人声：这是我们都会演奏的乐器。',['instrument','play']),
      s(8,15,'It\'s the most powerful sound in the world, probably.','这可能是世界上最强大的声音。',['powerful','sound']),
    ] },
  { id: 33, courseId: 5, stageId: 5, title: '10 Ways to Have a Better Conversation', speaker: 'Celeste Headlee',
    sourceType: 'youtube', sourceId: 'R1vski-oWd4', duration: '11:56', cefr: 'B2',
    tags: ['TED','沟通','社交'], description: 'Celeste Headlee 分享十种更好对话的方法',
    sentences: [
      s(0,7,'When I was in my 20s, I was a journalist.','我20多岁时，是一名记者。',['journalist']),
      s(8,15,'I was reporting on the war in Bosnia.','我当时在报道波斯尼亚的战争。',['reporting','war']),
    ] },
  { id: 34, courseId: 5, stageId: 5, title: 'The Skill of Self-Confidence', speaker: 'Ivan Joseph',
    sourceType: 'youtube', sourceId: 'w-HYZv6HzAs', duration: '13:11', cefr: 'B2',
    tags: ['TED','自信','心理'], description: 'Ivan Joseph 关于自信心的 TED 演讲',
    sentences: [
      s(0,7,'I grew up in a small village in India.','我在印度的一个小村庄长大。',['grew up','village']),
      s(8,15,'I was the first person in my family to go to college.','我是家里第一个上大学的人。',['first person','college']),
    ] },

  // ===== Stage 6: CET-6 C1 =====
  { id: 35, courseId: 6, stageId: 6, title: 'Elon Musk on AI and the Future', speaker: 'Elon Musk',
    sourceType: 'youtube', sourceId: 'smK9dgdRl4Q', duration: '25:00', cefr: 'C1',
    tags: ['访谈','科技','AI','商业'], description: 'Elon Musk 讨论人工智能和人类未来',
    sentences: [
      s(0,8,'I think AI is going to be the most transformative technology','我认为AI将成为最具变革性的技术',['transformative','technology']),
      s(9,16,'that humanity has ever created.','人类有史以来创造的。',['humanity','created']),
    ] },
  { id: 36, courseId: 6, stageId: 6, title: 'Bill Gates: The Next Outbreak', speaker: 'Bill Gates',
    sourceType: 'youtube', sourceId: '6Af6b_wyiwI', duration: '8:56', cefr: 'C1',
    tags: ['TED','健康','疫情','科技'], description: 'Bill Gates 2015年关于下一次疫情爆发的预言性演讲',
    sentences: [
      s(0,7,'When I was a kid, the disaster we worried about most was a nuclear war.','我小时候，我们最担心的灾难是核战争。',['disaster','nuclear war']),
      s(8,15,'If anything kills over 10 million people in the next few decades,','如果有什么能在未来几十年内杀死超过1000万人，',['kills','decades']),
      s(16,23,'it\'s most likely to be a highly infectious virus rather than a war.','那最可能是一种高传染性病毒，而不是战争。',['infectious','virus']),
    ] },
  { id: 37, courseId: 6, stageId: 6, title: 'Sam Altman: The Future of OpenAI', speaker: 'Sam Altman',
    sourceType: 'youtube', sourceId: 'bB VFxRFWpY', duration: '20:00', cefr: 'C1',
    tags: ['访谈','AI','科技','创业'], description: 'Sam Altman 讨论 OpenAI 和人工智能的未来',
    sentences: [
      s(0,7,'AI is going to be the biggest technology revolution of our lifetime.','AI将是我们一生中最大的技术革命。',['revolution','lifetime']),
      s(8,15,'We are building tools that can think.','我们在建造能思考的工具。',['tools','think']),
    ] },
  { id: 38, courseId: 6, stageId: 6, title: 'Obama: A More Perfect Union', speaker: 'Barack Obama',
    sourceType: 'youtube', sourceId: 'GvJtbbOynQE', duration: '37:00', cefr: 'C1',
    tags: ['演讲','政治','种族','历史'], description: '2008年奥巴马关于种族问题的历史性演讲',
    sentences: [
      s(0,7,'We the people, in order to form a more perfect union.','我们人民，为了建立一个更完美的联盟。',['perfect','union']),
      s(8,15,'Two hundred and twenty-one years ago, in a hall that still stands','221年前，在一座仍然矗立的大厅里',['hall','stands']),
    ] },
  { id: 39, courseId: 6, stageId: 6, title: 'Naval Ravikant: How to Get Rich', speaker: 'Naval Ravikant',
    sourceType: 'youtube', sourceId: '1o0bCqxG1p4', duration: '30:00', cefr: 'C1',
    tags: ['访谈','创业','财富','哲学'], description: 'Naval Ravikant 关于财富和幸福的思考',
    sentences: [
      s(0,7,'Seek wealth, not money or status.','追求财富，而不是金钱或地位。',['wealth','status']),
      s(8,15,'Wealth is having assets that earn while you sleep.','财富是拥有你睡觉时也在赚钱的资产。',['assets','earn']),
    ] },
  { id: 40, courseId: 6, stageId: 6, title: '乔布斯2007年iPhone发布会', speaker: 'Steve Jobs',
    sourceType: 'bilibili', sourceId: 'BV1Es411E7Zv', duration: '10:00', cefr: 'C1',
    tags: ['演讲','科技','苹果','历史','中文'], description: '2007年第一代iPhone发布会经典时刻（中文字幕）',
    isChineseOriginal: false,
    sentences: [
      s(0,7,'Every once in a while, a revolutionary product comes along that changes everything.','每隔一段时间，就会出现一个改变一切的革命性产品。',['revolutionary','changes']),
      s(8,15,'Apple has been very fortunate.','苹果一直非常幸运。',['fortunate']),
      s(16,23,'Today, we are introducing three revolutionary products.','今天，我们要介绍三款革命性产品。',['introducing','revolutionary']),
    ] },
  { id: 41, courseId: 6, stageId: 6, title: '马斯克：为什么要移民火星', speaker: 'Elon Musk',
    sourceType: 'bilibili', sourceId: 'BV1GJ411x7h7', duration: '15:00', cefr: 'C1',
    tags: ['演讲','科技','太空','中文'], description: 'Elon Musk 讲述SpaceX和火星殖民计划（中文字幕）',
    sentences: [
      s(0,8,'I think it\'s important for humanity to become a multi-planet species.','我认为人类成为多星球物种是很重要的。',['humanity','multi-planet']),
      s(9,16,'The probability of a long-term civilization is much higher if we are on multiple planets.','如果我们分布在多个星球上，长期文明的概率会高得多。',['probability','civilization']),
    ] },
  { id: 42, courseId: 6, stageId: 6, title: '查理芒格：人类误判心理学', speaker: 'Charlie Munger',
    sourceType: 'bilibili', sourceId: 'BV1wW411b7xf', duration: '20:00', cefr: 'C1',
    tags: ['演讲','投资','心理学','智慧','中文'], description: '查理芒格关于人类误判心理学的经典演讲（中文翻译）',
    isChineseOriginal: true,
    sentences: [
      s(0,8,'The psychology of human misjudgment is the most important thing to understand.','人类误判心理学是最重要的事情。',['misjudgment','important']),
      s(9,16,'We all have cognitive biases that lead us astray.','我们都有导致我们误入歧途的认知偏见。',['cognitive biases','astray']),
    ] },
  { id: 43, courseId: 6, stageId: 6, title: 'David Foster Wallace: This is Water', speaker: 'David Foster Wallace',
    sourceType: 'youtube', sourceId: '8CrOL-ydFMI', duration: '22:00', cefr: 'C1',
    tags: ['演讲','哲学','人生','文学'], description: '2005年凯尼恩学院毕业典礼演讲，关于意识和选择',
    sentences: [
      s(0,7,'There are these two young fish swimming along, and they happen to meet an older fish swimming the other way.','有两条小鱼向前游着，碰巧遇到一条迎面游来的老鱼。',['happen to meet']),
      s(8,15,'The older fish nods at them and says, Morning, boys. How\'s the water?','老鱼朝它们点点头说：早上好，孩子们。水怎么样？',['nods','water']),
      s(16,23,'And the two young fish swim on for a bit, and then eventually one of them looks over at the other','两条小鱼继续游了一会儿，最终其中一条看着另一条',['eventually','looks over']),
    ] },
  { id: 44, courseId: 6, stageId: 6, title: '俞敏洪：在绝望中寻找希望', speaker: 'Yu Minhong 俞敏洪',
    sourceType: 'bilibili', sourceId: 'BV1xs411Q7xf', duration: '12:00', cefr: 'C1',
    tags: ['演讲','励志','教育','中文原声'], description: '俞敏洪经典演讲：在绝望中寻找希望（中文原声）',
    isChineseOriginal: true,
    sentences: [
      s(0,7,'Life is like a marathon.','人生就像一场马拉松。',['marathon']),
      s(8,15,'It doesn\'t matter how fast you run, what matters is that you keep going.','跑多快不重要，重要的是你一直在跑。',['keep going']),
      s(16,23,'In the midst of despair, always look for hope.','在绝望中，永远寻找希望。',['despair','hope']),
    ] },
  { id: 45, courseId: 6, stageId: 6, title: '雷军：永远相信美好的事情即将发生', speaker: 'Lei Jun 雷军',
    sourceType: 'bilibili', sourceId: 'BV1qW411b7xf', duration: '15:00', cefr: 'C1',
    tags: ['演讲','创业','科技','中文原声'], description: '雷军经典演讲（中文原声）',
    isChineseOriginal: true,
    sentences: [
      s(0,7,'Always believe that wonderful things are about to happen.','永远相信美好的事情即将发生。',['believe','wonderful']),
      s(8,15,'The wind can lift a pig, but it can\'t make a pig fly.','风口上猪都能飞起来，但风停了摔死的还是猪。',['wind','fly']),
      s(16,23,'Effort is the basic condition, but direction is more important than effort.','努力是基本条件，但方向比努力更重要。',['direction','effort']),
    ] },
]
