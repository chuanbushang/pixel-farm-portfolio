import { NavLink } from 'react-router'

const UI = '/assets/icons/ui'
const links = [
  { to: '/', label: '主页', img: `${UI}/obj-cookie.png` },
  { to: '/hobbies', label: '爱好', img: `${UI}/heart-4x.png` },
  { to: '/skills', label: '技能', img: `${UI}/obj-starbook.png` },
  { to: '/experience', label: '经历', img: `${UI}/key-4x.png` },
  { to: '/projects', label: '项目', img: `${UI}/obj-spur.png` },
  { to: '/honors', label: '荣誉', img: `${UI}/obj-ticket.png` },
  { to: '/contact', label: '联系', img: `${UI}/point-4x.png` },
]

/** 站点导航：左上角木牌按钮，主页以外页面可见 */
export default function SiteNav() {
  return (
    <nav className="flex min-w-0 flex-1 flex-wrap gap-2">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} end={link.to === '/'}>
          {({ isActive }) => (
            <div
              className="wood-btn flex cursor-pointer flex-col items-center gap-1 px-2.5 py-1.5"
              style={isActive ? { filter: 'brightness(1.15) saturate(1.2)', transform: 'translateY(2px)' } : undefined}
            >
              <img src={link.img} alt="" style={{ width: 22, height: 22, imageRendering: 'pixelated' }} />
              <span className="font-pixel text-[10px] leading-none text-[#5a3a1e]">{link.label}</span>
            </div>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
