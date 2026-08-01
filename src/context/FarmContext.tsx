import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useBgm } from '../hooks/useBgm'
import { SEASONS, type Season, type SeasonConfig } from '../data/seasons'

const STORAGE_KEY = 'farm-season'

function loadSeason(): Season {
  const saved = window.localStorage.getItem(STORAGE_KEY)
  return saved && saved in SEASONS ? (saved as Season) : 'spring'
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

  // 进网站自动播放音乐：先直接尝试；被浏览器拦截则等首次点击/按键时补播（一次性）
  useEffect(() => {
    let cancelled = false
    const onGesture = () => {
      window.removeEventListener('pointerdown', onGesture)
      window.removeEventListener('keydown', onGesture)
      if (!cancelled) void music.play().catch(() => {})
    }
    void music.tryAutoplay().then((ok) => {
      if (cancelled || ok) return
      window.addEventListener('pointerdown', onGesture)
      window.addEventListener('keydown', onGesture)
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
