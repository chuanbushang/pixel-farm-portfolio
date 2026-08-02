import { useState } from 'react'
import { NavLink } from 'react-router'
import SeasonSwitcher from './SeasonSwitcher'
import type { Season } from '../data/seasons'
import { useIsMobile } from '../lib/useIsMobile'

const UI = '/assets/icons/ui'
const links = [
  { to: '/about', label: '关于我', img: `${UI}/obj-cookie.png` },
  { to: '/hobbies', label: '爱好', img: `${UI}/heart-4x.png` },
  { to: '/skills', label: '技能', img: `${UI}/obj-starbook.png` },
  { to: '/experience', label: '经历', img: `${UI}/key-4x.png` },
  { to: '/projects', label: '项目', img: `${UI}/obj-spur.png` },
  { to: '/honors', label: '荣誉', img: `${UI}/obj-ticket.png` },
  { to: '/contact', label: '联系', img: `${UI}/point-4x.png` },
]

function NavBtn({ to, label, img, onClick }: { to: string; label: string; img: string; onClick?: () => void }) {
  return (
    <NavLink to={to} end={to === '/about'} onClick={onClick}>
      {({ isActive }) => (
        <div
          className="wood-btn flex cursor-pointer flex-col items-center gap-1 px-2.5 py-1.5"
          style={isActive ? { filter: 'brightness(1.15) saturate(1.2)', transform: 'translateY(2px)' } : undefined}
        >
          <img src={img} alt="" style={{ width: 22, height: 22, imageRendering: 'pixelated' }} />
          <span className="font-pixel text-[10px] leading-none text-[#5a3a1e]">{label}</span>
        </div>
      )}
    </NavLink>
  )
}

interface SiteNavProps {
  season: Season
  onChangeSeason: (season: Season) => void
}

/** 站点导航：主页以外页面可见。
 * 横屏：7 个按钮平铺 + 季节切换在右；
 * 竖屏：第一行固定为 [菜单]…[季节切换]，点开菜单后导航以带背景的面板整排出现在下一行（不浮在文字上） */
export default function SiteNav({ season, onChangeSeason }: SiteNavProps) {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()
  // 面板（带底纹背景）只在竖屏且菜单展开时出现；横屏导航永远平铺无背景
  const showPanel = open && isMobile

  return (
    <>
      {/* 竖屏：菜单切换牌（横屏不显示，导航直接平铺） */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="wood-btn flex cursor-pointer flex-col items-center gap-1 px-2.5 py-1.5 sm:hidden"
        aria-expanded={open}
        aria-label="展开导航菜单"
      >
        <img src={`${UI}/button.png`} alt="" style={{ width: 22, height: 22, imageRendering: 'pixelated' }} />
        <span className="font-pixel text-[10px] leading-none text-[#5a3a1e]">菜单</span>
      </button>

      {/* 季节切换：始终在第一行右侧（移到 SiteNav 内保证 DOM 顺序，避免菜单展开时掉到下一行） */}
      <SeasonSwitcher season={season} onChange={onChangeSeason} />

      {/* 导航排：竖屏默认隐藏，菜单展开时以带底纹面板整排显示；横屏常显平铺 */}
      <nav
        className={`${showPanel ? 'stardew-textbox flex' : 'hidden'} order-3 w-full flex-wrap gap-2 p-2 sm:order-none sm:flex sm:w-auto sm:min-w-0 sm:flex-1 sm:p-0`}
      >
        {links.map((link) => (
          <NavBtn key={link.to} {...link} onClick={() => setOpen(false)} />
        ))}
      </nav>
    </>
  )
}
