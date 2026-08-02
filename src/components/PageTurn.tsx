import { useLocation, useNavigate } from 'react-router'

const UI = '/assets/icons/ui'
// 页面顺序与顶部导航一致；主页（标题屏）不参与翻页
const ORDER = [
  { to: '/about', label: '关于我' },
  { to: '/hobbies', label: '爱好' },
  { to: '/skills', label: '技能' },
  { to: '/experience', label: '经历' },
  { to: '/projects', label: '项目' },
  { to: '/honors', label: '荣誉' },
  { to: '/contact', label: '联系' },
]

/** 页尾翻页键：上一页 / 下一页（left/right 贴图），对称居中；
 * 第一页只有「下一页」、最后一页只有「上一页」，单按钮仍居中 */
export default function PageTurn() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const idx = ORDER.findIndex((p) => p.to === pathname)
  if (idx === -1) return null

  const prev = idx > 0 ? ORDER[idx - 1] : null
  const next = idx < ORDER.length - 1 ? ORDER[idx + 1] : null

  const btn = (
    to: string,
    icon: string,
    text: string,
    iconFirst: boolean,
    aria: string,
  ) => (
    <button
      type="button"
      onClick={() => navigate(to)}
      className="wood-btn flex cursor-pointer items-center gap-2 px-3 py-2 sm:px-4"
      aria-label={aria}
    >
      {iconFirst && (
        <img src={icon} alt="" style={{ width: 26, height: 26, imageRendering: 'pixelated' }} />
      )}
      <span className="font-pixel text-xs text-[#5a3a1e] sm:text-sm">{text}</span>
      {!iconFirst && (
        <img src={icon} alt="" style={{ width: 26, height: 26, imageRendering: 'pixelated' }} />
      )}
    </button>
  )

  return (
    <div className="relative z-10 flex items-center justify-center gap-6 pb-6 sm:gap-10">
      {prev && btn(prev.to, `${UI}/left.png`, `上一页 · ${prev.label}`, true, `上一页：${prev.label}`)}
      {next && btn(next.to, `${UI}/right.png`, `下一页 · ${next.label}`, false, `下一页：${next.label}`)}
    </div>
  )
}
