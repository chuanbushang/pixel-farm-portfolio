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

  // ============ 技能（四大类） ============
  skills: [
    {
      category: 'AI 应用',
      items: ['提示词设计优化', 'AIGC 生成', 'Vibe Coding', '网站设计制作'],
      note: '用 AI 把想法变成作品',
    },
    {
      category: '图像设计',
      items: ['Photoshop', '醒图', '剪映'],
      note: '图文编辑与视觉呈现',
    },
    {
      category: '数据分析',
      items: ['Python', 'SPSS', 'Excel', 'Access'],
      note: '数据统计分析 · 数据库管理',
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
    title: '蛋炒饭项目（示例）',
    brief: '这是我做的蛋炒饭',
    tech: ['鸡蛋', '米饭', '葱花', '食盐'],
    detail: ['这是一张预设示例卡，用来展示「标题 + 简介 + 单体技术备注 + 封面展开详情」的版式。'],
    images: [],
  },
  {
    title: '【待补充】项目二',
    brief: '一句话项目简介写在这里',
    tech: ['单体技术 1', '单体技术 2'],
    images: [],
  },
  {
    title: '【待补充】项目三',
    brief: '一句话项目简介写在这里',
    tech: [],
    images: [],
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
    images: [],
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
    images: [],
  },
  {
    period: '2023 - 至今',
    title: '院校级社团 · 主要负责人',
    tag: '学生工作',
    brief: '参与各类院校级社团，并担任主要负责人',
    detail: ['与社团成员一起努力，获得多项院校级荣誉（详见「成就系统」页面）'],
    images: [],
  },
]

// ============ 我喜欢的 ============
export interface Hobby {
  icon: 'camera' | 'note' | 'bowl' | 'film' | 'star'
  title: string
  brief: string
  images: string[]
  noCover?: boolean // 不显示封面区
  cornerSprite?: string // 右下角动图装饰
}

export const hobbies: Hobby[] = [
  { icon: 'camera', title: '摄影', brief: '记录光线、空间和情绪的入口', images: [
    '/assets/material/photography/web/camera-1.jpg',
    '/assets/material/photography/web/camera-2.jpg',
    '/assets/material/photography/web/camera-3.jpg',
    '/assets/material/photography/web/camera-4.jpg',
    '/assets/material/photography/web/camera-5.jpg',
    '/assets/material/photography/web/camera-6.jpg',
  ] },
  { icon: 'note', title: '音乐', brief: '无樂不欢♪', images: [] },
  { icon: 'bowl', title: '美食', brief: '人间烟火气，最抚凡人心', images: [] },
  { icon: 'film', title: '电影', brief: '在别人的故事里看见自己', images: [] },
  { icon: 'star', title: '开发中', brief: '希望遇见更多美好', images: [], noCover: true, cornerSprite: '/assets/icons/ui/dogsmile-7.png' },
]

// ============ 荣誉（成就系统） ============
export interface Honor {
  year: string
  title: string
  org: string
  images: string[] // 证书照片
}

export const honors: Honor[] = [
  { year: '—', title: '“寻迹年味”实践 校级三等奖', org: '社会实践', images: [] },
  { year: '2025', title: '2024-2025 学年社团积极分子', org: '学生社团', images: [] },
  { year: '2024', title: '武汉大学第二十三届金秋摄影设计大赛 视频组 校级三等奖', org: '摄影设计', images: [] },
  { year: '2024', title: '武汉大学第二届心理情景剧大赛 校级二等奖', org: '情景剧', images: [] },
  { year: '2025', title: '武汉大学第三届心理情景剧大赛 校级二等奖', org: '情景剧', images: [] },
  { year: '2025', title: '第十五届全国大学生电子商务“创新、创意及创业”挑战赛 武汉大学校级二等奖', org: '三创赛', images: [] },
  { year: '2025', title: '武汉大学第二届“以全面深化改革推进中国式现代化典型案例分析大赛” 校级三等奖', org: '案例分析', images: [] },
  { year: '2025', title: '社团获美丽中国第七期一分钟支教优秀合作社团', org: '公益合作', images: [] },
  { year: '2026', title: '社团入围公益未来 · 露露乐蒙青少年赋能计划方案', org: '公益计划', images: [] },
]
