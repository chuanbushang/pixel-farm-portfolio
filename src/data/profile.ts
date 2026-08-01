// ============================================================
//  网站内容数据（真实信息，来自任务文稿 2026-07-25）
//  图片挂载：把图片放进 public/assets/material/ 后告诉 AI 文件名
// ============================================================

export const profile = {
  name: '吴昱汐',
  title: '武汉大学信息管理学院 · 图书馆学（本科在读）',
  farmName: '川不尚的农场',
  level: 3, // 大三在读
  intro:
    'ENFP 快乐小狗 · 金牛座。喜欢摄影、音乐、美食和电影，正在信息、影像与思想之间，记录并构建自己的世界。欢迎来我的生活物语逛逛！',

  // ============ 技能（九大类，3×3 网格） ============
  skills: [
    {
      category: 'AI 应用',
      items: ['提示词设计优化', 'AIGC 生成', 'Vibe Coding'],
      note: '用 AI 把想法变成作品',
    },
    {
      category: '图像设计',
      items: ['Photoshop', '醒图', '剪映'],
      note: '图文编辑与视觉呈现',
    },
    {
      category: '新媒体',
      items: ['运营', '平台分析', '小红书', 'bilibili'],
      note: '新媒体内容策划',
    },
    {
      category: '数据统计',
      items: ['Excel', 'SPSS'],
      note: '数据的收集与整理',
    },
    {
      category: '数据分析',
      items: ['Python', 'SPSS', 'Pandas'],
      note: '数据清洗与分析、文本处理',
    },
    {
      category: '数据库',
      items: ['Access'],
      note: '数据库的设计管理与应用',
    },
    {
      category: '市场分析',
      items: ['市场调研', '竞品拆解'],
      note: '洞察市场，寻找机会',
    },
    {
      category: '用户感知',
      items: ['用户行为分析', '体验设计', '用户感知'],
      note: '站在用户一边思考',
    },
    {
      category: '语言能力',
      items: ['普通话二级甲等', '大学英语四级'],
      note: '可快速浏览英文专业书籍',
    },
  ] as SkillCategory[],

  // ============ 联系方式 ============
  contacts: [
    { label: '电话', value: '18143806190', href: 'tel:18143806190' },
    { label: '邮箱', value: '2911796263@qq.com', href: 'mailto:2911796263@qq.com' },
    { label: '哔哩哔哩', value: '川不尚', href: 'https://space.bilibili.com/440409175' },
  ],
}

export interface SkillCategory {
  category: string
  items: string[]
  note: string
}

// ============ 项目作品（上文下图 + 单体技术备注 + 点击展开） ============
export interface Project {
  title: string
  brief: string
  tech: string[] // 单体技术备注
  detail?: string[]
  images: string[] // 封面图 / 详情图（public/assets/material/ 下的路径）
}

export const projects: Project[] = [
  {
    title: '武汉城市书房运营调研与优化设计',
    brief: '内容运营与用户偏好研究',
    tech: ['用户调研', '数据分析', '策略方案'],
    detail: [
      '调研 4 家武汉代表性城市书房，梳理政策文献 2 份，采集场馆藏书、开放时长等 12 类运营数据',
      '通过访谈、现场观察分析客流不足问题，输出万字调研报告与 5 年优化战略',
    ],
    images: [
      '/assets/material/project/bookstore/web/book1.jpg',
      '/assets/material/project/bookstore/web/book2.jpg',
      '/assets/material/project/bookstore/web/book3.jpg',
    ],
  },
  {
    title: '全国大学生电子商务“三创赛”团队项目',
    brief: '竞品分析、产品拆解、模式对比、用户行为研究',
    tech: ['竞品分析', '产品拆解', '用户行为研究'],
    detail: [
      '确立标准化竞品分析框架，完整实测芭芭农场、Suki 两大案例，梳理 7 类用户激励途径，拆解平台留存变现底层逻辑',
      '对比总结竞品痛点：电商电子农场玩法同质化、作物模拟精细化不足；传统养成游戏仅有虚拟反馈，缺乏实体价值闭环',
      '整理功能对比图表，独立撰写竞品分析核心内容，输出多项产品交互、用户激励优化建议',
    ],
    images: ['/assets/material/project/cdjl2.png'],
  },
  {
    title: '谄媚性 AI 对用户信息行为影响实证研究',
    brief: '交互式人工智能底层逻辑分析',
    tech: ['实证研究', '实验设计', '统计分析'],
    detail: [
      '围绕大模型 RLHF 训练带来的算法谄媚问题，梳理技术、心理、社会多层成因，结合真实交互案例总结其危害：加剧信息茧房、降低用户信息验证意愿、弱化批判性思维、破坏人机信任',
      '针对现有研究缺乏实证、场景区分不足的空白，设计对照实验，规划方差分析、独立样本 t 检验等统计方法，预测不同条件下 AI 对用户信息检索、求证、决策行为的差异化影响',
      '融合计算机、传播学、心理学交叉理论构建分析框架，为大模型交互策略优化提供实证参考',
    ],
    images: ['/assets/material/project/aicahnmei.png'],
  },
  {
    title: '个人作品集网站搭建',
    brief: '创意内容线上展示（chuanbushang.com）',
    tech: ['Vite', 'React', 'Kimi-Work'],
    detail: [
      '独立搭建个人项目展示网站，自主完成页面文案、视觉排版、内容架构设计',
      '整合调研报告、竞赛方案、视觉创意视频、图文物料等 30+ 份作品素材；使用 Kimi-Work 辅助完成内容更新、板块迭代，搭建线上个人展示渠道',
    ],
    images: ['/assets/material/project/cbs.png'],
  },
]

// ============ 经历 ============
export interface ExperienceItem {
  period: string
  title: string
  tag: string
  brief: string
  detail: string[]
  images: string[]
  coverPos?: string // 封面裁切取景位置（如 'bottom' 取最下方）
}

export const experience: ExperienceItem[] = [
  {
    period: '2023.09 - 2027.06',
    title: '武汉大学 信息管理学院 · 图书馆学（A+ 专业）',
    tag: '教育经历',
    brief: '本科在读',
    detail: [
      '专业课程：信息行为分析、信息服务与用户、用户体验设计、信息系统分析与设计、数据可视化、信息咨询与决策',
    ],
    images: ['/assets/material/experience/web/school.jpg'],
  },
  {
    period: '2025.11 - 至今',
    title: '档案室学生助管 · 武汉大学档案室',
    tag: '实践经历',
    brief: '学生档案的信息审核、录入与分类编目',
    detail: [
      '数据收集与整理：累计处理 3000+ 份实体档案，保持零差错率，锻炼严谨细致的工作习惯',
      '信息检索与服务：日均接待师生档案查询咨询 10+ 次，准确理解需求并快速定位信息',
      '文档管理与归档：协助完成档案寄送、调阅等跨部门事务，熟悉文件归档流程与行政辅助工作',
    ],
    images: [],
  },
  {
    period: '2025.06 - 至今',
    title: '摄影组成员 · 武汉大学种太阳工作室',
    tag: '实践经历',
    brief: '公益项目团队摄影与传播材料制作',
    detail: [
      '公益项目全程参与：参与支教夏令营活动，担任团队摄影，深度记录项目执行过程',
      '传播材料制作：熟练使用 PS、视频剪辑软件，独立制作项目宣传片及图文内容',
      '公益传播实践：公益活动报道被微信公众号收录，展现对公益领域的理解与传播意识',
    ],
    images: [
      '/assets/material/experience/web/teach1.jpg',
      '/assets/material/experience/web/teach2.jpg',
      '/assets/material/experience/sunwork/teach3.jpg',
      '/assets/material/experience/sunwork/teach4.jpg',
    ],
  },
  {
    period: '2024~2025',
    title: '院校级社团 · 主要负责人',
    tag: '学生工作',
    brief: '参与各类院校级社团，并担任主要负责人',
    detail: ['与社团成员一起努力，获得多项院校级荣誉（详见「成就系统」页面）'],
    images: ['/assets/material/experience/party.png'],
    coverPos: 'bottom',
  },
]

// ============ 我喜欢的 ============
export interface CornerAnim {
  src: string // 横向动画条路径
  frames: number
  frameMs?: number // 每帧间隔 ms（默认 400）
  w: number
  h: number
}

export interface Hobby {
  icon: 'camera' | 'note' | 'bowl' | 'film' | 'star' | 'startea' | 'cat'
  title: string
  brief: string
  images: string[]
  noCover?: boolean // 不显示封面区
  noExpand?: boolean // 封面纯展示，不可点击展开详情
  coverContain?: boolean // 封面完整显示原构图（不裁切）
  cornerAnim?: CornerAnim // 右下角动图装饰
  cornerAnimWinter?: CornerAnim // 冬季替换版（有则冬季自动切换）
}

export const hobbies: Hobby[] = [
  { icon: 'startea', title: '友谊', brief: 'FRIENDSHIP✌', images: [
    '/assets/material/friendship/web/friendship5.jpg',
    '/assets/material/friendship/web/friendship4.jpg',
    '/assets/material/friendship/web/friendship1.jpg',
    '/assets/material/friendship/web/friendship2.jpg',
    '/assets/material/friendship/web/friendship3.jpg',
  ],
    cornerAnim: { src: '/assets/icons/characters/anim-abigail.png', frames: 7, w: 32, h: 56 },
    cornerAnimWinter: { src: '/assets/icons/characters/anim-abigail-winter.png', frames: 7, w: 34, h: 56 },
  },
  { icon: 'camera', title: '摄影', brief: '光、影、人物与繁花', images: [
    '/assets/material/photography/web/camera-7.jpg',
    '/assets/material/photography/web/camera-1.jpg',
    '/assets/material/photography/web/camera-2.jpg',
    '/assets/material/photography/web/camera-3.jpg',
    '/assets/material/photography/web/camera-4.jpg',
    '/assets/material/photography/web/camera-5.jpg',
    '/assets/material/photography/web/camera-6.jpg',
  ],
    cornerAnim: { src: '/assets/icons/characters/anim-haley.png?v=3', frames: 5, w: 28, h: 56 },
    cornerAnimWinter: { src: '/assets/icons/characters/anim-haley-winter.png?v=3', frames: 5, w: 28, h: 56 },
  },
  { icon: 'bowl', title: '美食', brief: '人间烟火气，最抚凡人心',
    images: [
      '/assets/material/food/food1.jpg',
      '/assets/material/food/food2.jpg',
      '/assets/material/food/food3.jpg',
    ],
    cornerAnim: { src: '/assets/icons/characters/anim-gus.png', frames: 7, w: 28, h: 56 },
    cornerAnimWinter: { src: '/assets/icons/characters/anim-gus-winter.png', frames: 7, w: 28, h: 56 },
  },
  { icon: 'film', title: '话剧', brief: '在别人的故事里看见自己',
    images: [
      '/assets/material/movie/web/movie1.jpg',
      '/assets/material/movie/web/movie2.jpg',
      '/assets/material/movie/web/movie3.jpg?v=2',
      '/assets/material/movie/web/movie4.jpg',
    ],
    cornerAnim: { src: '/assets/icons/characters/anim-krobus.png', frames: 7, w: 38, h: 56 },
  },
  { icon: 'cat', title: '小动物', brief: '小动物拯救世界！', coverContain: true, images: [
    '/assets/material/cute/web/cute1.jpg',
    '/assets/material/cute/web/cute2.jpg',
    '/assets/material/cute/web/cute3.jpg',
    '/assets/material/cute/web/cute4.jpg',
    '/assets/material/cute/web/cute5.jpg',
    '/assets/material/cute/web/cute6.jpg',
  ],
    cornerAnim: { src: '/assets/icons/ui/anim-cat.png', frames: 7, frameMs: 400, w: 47, h: 56 },
  },
  { icon: 'star', title: '开发中', brief: '希望遇见更多美好', images: [], noCover: true,
    cornerAnim: { src: '/assets/icons/ui/dogsmile-7.png', frames: 7, frameMs: 400, w: 50, h: 53 },
  },
]

// ============ 荣誉（成就系统） ============
export interface Honor {
  year: string
  title: string
  org: string
  images: string[] // 证书照片
}

export const honors: Honor[] = [
  { year: '2025', title: '2024-2025 学年社团积极分子', org: '学生社团', images: ['/assets/material/honor/shetuan-2025.png'] },
  { year: '2024', title: '武汉大学第二十三届金秋摄影设计大赛 视频组 校级三等奖', org: '摄影设计', images: ['/assets/material/honor/sheying3.jpg', '/assets/material/honor/sheying1.jpg', '/assets/material/honor/sheying2.jpg'] },
  { year: '2024', title: '武汉大学第二届心理情景剧大赛 校级二等奖', org: '情景剧', images: ['/assets/material/honor/xljq-2024.png', '/assets/material/honor/jinqiu-2024.png'] },
  { year: '2025', title: '武汉大学第三届心理情景剧大赛 校级二等奖', org: '情景剧', images: ['/assets/material/honor/xljq-2025.jpg'] },
  { year: '2025', title: '第十五届全国大学生电子商务“创新、创意及创业”挑战赛 武汉大学校级二等奖', org: '三创赛', images: ['/assets/material/honor/sanchuang.jpg'] },
  { year: '2025', title: '武汉大学第二届“以全面深化改革推进中国式现代化典型案例分析大赛” 校级三等奖', org: '案例分析', images: ['/assets/material/honor/xigai.jpg'] },
  { year: '2025', title: '社团获美丽中国第七期一分钟支教优秀合作社团', org: '公益合作', images: ['/assets/material/honor/mlzg-2025.png'] },
  { year: '2026', title: '社团入围公益未来 · 露露乐蒙青少年赋能计划方案', org: '公益计划', images: ['/assets/material/honor/lulule-2026.jpg'] },
]
