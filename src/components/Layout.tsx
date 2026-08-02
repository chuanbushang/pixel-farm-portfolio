import type { ReactNode } from 'react'
import { useLocation } from 'react-router'
import PixelArt from './PixelArt'
import { cloud } from './sprites'
import SeasonSwitcher from './SeasonSwitcher'
import SeasonParticles from './SeasonParticles'
import Butterflies from './Butterflies'
import MusicToggle from './MusicToggle'
import HomeButton from './HomeButton'
import SiteNav from './SiteNav'
import { useFarm } from '../context/FarmContext'
import { SEASON_BG } from '../data/seasons'
import { useIsMobile } from '../lib/useIsMobile'

/** 全局布局：四季 Highlands 背景 + 四季特效 + 导航 + 音乐面板 */
export default function Layout({ children }: { children: ReactNode }) {
  const { season, cfg, setSeason, music } = useFarm()
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isMobile = useIsMobile()

  return (
    <div
      className="farm-bg font-pixel min-h-screen text-[#3b2a1a] transition-colors duration-700"
      style={{
        backgroundImage: `url(/assets/icons/buildings/HighlandsBackground_${SEASON_BG[season]}.png), linear-gradient(to bottom, ${cfg.skyTop}, ${cfg.skyMid}, ${cfg.skyBottom})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        imageRendering: 'pixelated',
      }}
    >
      {/* 背景飘云（所有页面共享；竖屏省略以省性能） */}
      {!isMobile && (
        <>
          <PixelArt rows={cloud.rows} palette={cloud.palette} scale={4} className="animate-drift fixed top-[22%] z-0 opacity-60" style={{ animationDuration: '95s' }} />
          <PixelArt rows={cloud.rows} palette={cloud.palette} scale={3} className="animate-drift fixed top-[48%] z-0 opacity-40" style={{ animationDuration: '120s', animationDelay: '-55s' }} />
        </>
      )}

      {/* 顶栏：导航（主页隐藏，大牌子已提供跳转） + 季节切换同一弹性行；窄屏允许换行防挤压 */}
      <div className="fixed inset-x-0 top-0 z-50 flex flex-wrap items-start justify-between gap-2 p-3 md:gap-3 md:p-4">
        {isHome ? <span /> : <SiteNav />}
        <SeasonSwitcher season={season} onChange={setSeason} />
      </div>
      <SeasonParticles kind={cfg.particle} light={isMobile} />
      {season === 'summer' && !isMobile && <Butterflies />}

      {children}

      {!isHome && <HomeButton />}
      <MusicToggle playing={music.playing} onToggle={music.toggle} />
    </div>
  )
}
