import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useBgm } from '../hooks/useBgm'
import { SEASONS, type Season, type SeasonConfig } from '../data/seasons'

const STORAGE_KEY = 'farm-season'

/** 按现实月份推导季节：3-5 春 / 6-8 夏 / 9-11 秋 / 12-2 冬 */
function seasonByDate(): Season {
  const m = new Date().getMonth() + 1
  if (m >= 3 && m <= 5) return 'spring'
  if (m >= 6 && m <= 8) return 'summer'
  if (m >= 9 && m <= 11) return 'autumn'
  return 'winter'
}

function loadSeason(): Season {
  const saved = window.localStorage.getItem(STORAGE_KEY)
  // 有记忆用手动选择；首次访问按现实季节初始化
  return saved && saved in SEASONS ? (saved as Season) : seasonByDate()
}

interface FarmState {
  season: Season
  cfg: SeasonConfig
  setSeason: (s: Season) => void
  music: ReturnType<typeof useBgm>
}

const FarmContext = createContext<FarmState | null>(null)

/** 全局农场状态：季节 + 音乐（跨页面共享，切页不换歌） */
export function FarmProvider({ children }: { children: ReactNode }) {
  const [season, setSeason] = useState<Season>(loadSeason)
  const music = useBgm(season)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, season)
  }, [season])

  // 进网站自动播放音乐：先直接尝试（可能静音起播）；手势监听提前注册，
  // 首次点击/按键时取消静音或补播（一次性）
  useEffect(() => {
    let cancelled = false
    let settled = false
    const onGesture = () => {
      window.removeEventListener('pointerdown', onGesture)
      window.removeEventListener('keydown', onGesture)
      if (cancelled || settled) return
      settled = true
      void music.resumeFromAutoplay().catch(() => {})
    }
    window.addEventListener('pointerdown', onGesture)
    window.addEventListener('keydown', onGesture)
    void music.tryAutoplay().then((result) => {
      if (cancelled || result !== 'played') return
      settled = true
      window.removeEventListener('pointerdown', onGesture)
      window.removeEventListener('keydown', onGesture)
    })
    return () => {
      cancelled = true
      window.removeEventListener('pointerdown', onGesture)
      window.removeEventListener('keydown', onGesture)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FarmContext.Provider value={{ season, cfg: SEASONS[season], setSeason, music }}>
      {children}
    </FarmContext.Provider>
  )
}

export function useFarm(): FarmState {
  const ctx = useContext(FarmContext)
  if (!ctx) throw new Error('useFarm 必须在 FarmProvider 内使用')
  return ctx
}
