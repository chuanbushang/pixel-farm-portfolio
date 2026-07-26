// 四季主题配置

export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export interface SeasonConfig {
  id: Season
  label: string
  skyTop: string
  skyMid: string
  skyBottom: string
  grassDark: string
  grassA: string
  grassB: string
  particle: 'petal' | 'none' | 'leaf' | 'snow'
  // 标题屏（主页第一屏）天空
  titleTop: string
  titleMid: string
  titleBottom: string
  titleStars: boolean
}

export const SEASONS: Record<Season, SeasonConfig> = {
  spring: {
    id: 'spring',
    label: '春',
    skyTop: '#7ec8f7',
    skyMid: '#a5dcf9',
    skyBottom: '#cdeefb',
    grassDark: '#3d7f33',
    grassA: '#4c9a3f',
    grassB: '#57ab47',
    particle: 'petal',
    titleTop: '#1c2f5e',
    titleMid: '#4a6fb8',
    titleBottom: '#f2b8c9',
    titleStars: true,
  },
  summer: {
    id: 'summer',
    label: '夏',
    skyTop: '#3fa0f0',
    skyMid: '#74c2f5',
    skyBottom: '#b8e4fb',
    grassDark: '#2c6e28',
    grassA: '#3f9636',
    grassB: '#49a83e',
    particle: 'none',
    titleTop: '#3fa0f0',
    titleMid: '#74c2f5',
    titleBottom: '#b8e4fb',
    titleStars: false,
  },
  autumn: {
    id: 'autumn',
    label: '秋',
    skyTop: '#f2a65a',
    skyMid: '#f7c987',
    skyBottom: '#fbe3b5',
    grassDark: '#8a6b2e',
    grassA: '#a8843a',
    grassB: '#b8923f',
    particle: 'leaf',
    titleTop: '#3a2456',
    titleMid: '#a8546e',
    titleBottom: '#f2a65a',
    titleStars: true,
  },
  winter: {
    id: 'winter',
    label: '冬',
    skyTop: '#9ec3e6',
    skyMid: '#c2daef',
    skyBottom: '#e6f2fb',
    grassDark: '#b8cfe3',
    grassA: '#dce9f5',
    grassB: '#eaf3fb',
    particle: 'snow',
    titleTop: '#0e1638',
    titleMid: '#2b3a6e',
    titleBottom: '#6e8fc8',
    titleStars: true,
  },
}

export const SEASON_ORDER: Season[] = ['spring', 'summer', 'autumn', 'winter']

// HighlandsBackground 文件后缀（四季背景图）
export const SEASON_BG: Record<Season, string> = {
  spring: 'Spring',
  summer: 'Summer',
  autumn: 'Fall',
  winter: 'Winter',
}
