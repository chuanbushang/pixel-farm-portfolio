import type { ReactNode } from 'react'
import { useState } from 'react'
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
  // 季节体验提示（仅主页）：诱导首次点击完成手势解锁音乐；点一次消失，刷新重现（不持久化）
  const [seasonHint, setSeasonHint] = useState(true)
  const handleSeason = (s: typeof season) => {
    setSeason(s)
    setSeasonHint(false)
  }

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

      {/* 顶栏：主页只显示季节切换（带体验提示）；内页为 [菜单]…[季节切换]（导航已并入 SiteNav，竖屏收成菜单面板） */}
      <div className="fixed inset-x-0 top-0 z-50 flex flex-wrap items-start justify-between gap-2 p-3 md:gap-3 md:p-4">
        {isHome ? (
          <>
            <span />
            <div className="relative flex flex-wrap items-center justify-end gap-2 sm:gap-3">
              {/* 季节体验提示：白色无背景闪烁（同款音乐提示样式），统一在左侧一行，竖屏小一号 */}
              {seasonHint && (
                <span
                  className="animate-fade font-pixel whitespace-nowrap text-xs text-white sm:text-sm"
                  style={{ textShadow: '1px 1px 0 #3b2a1a' }}
                >
                  点击体验不同季节主题
                </span>
              )}
              <SeasonSwitcher season={season} onChange={handleSeason} />
            </div>
          </>
        ) : (
          <SiteNav season={season} onChangeSeason={setSeason} />
        )}
      </div>
      <SeasonParticles kind={cfg.particle} light={isMobile} />
      {season === 'summer' && !isMobile && <Butterflies />}

      {children}

      {!isHome && <HomeButton />}
      <MusicToggle playing={music.playing} onToggle={music.toggle} />
    </div>
  )
}
