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
