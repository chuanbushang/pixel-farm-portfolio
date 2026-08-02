import { useState } from 'react'
import { NavLink } from 'react-router'

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

/** 站点导航：左上角木牌按钮，主页以外页面可见。
 * 横屏：7 个按钮平铺；竖屏：收成一块「菜单」牌，点击展开/收起整排导航 */
export default function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* 竖屏：菜单切换牌 */}
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

      {/* 导航排：竖屏默认隐藏（菜单展开时整排显示），横屏常显 */}
      <nav className={`${open ? 'flex' : 'hidden'} w-full flex-wrap gap-2 sm:flex sm:w-auto sm:min-w-0 sm:flex-1`}>
        {links.map((link) => (
          <NavBtn key={link.to} {...link} onClick={() => setOpen(false)} />
        ))}
      </nav>
    </>
  )
}
