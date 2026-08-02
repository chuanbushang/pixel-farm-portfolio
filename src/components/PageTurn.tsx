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
      className="wood-btn flex cursor-pointer items-center gap-1.5 px-2 py-1.5 sm:gap-2 sm:px-4 sm:py-2"
      aria-label={aria}
    >
      {iconFirst && (
        <img src={icon} alt="" className="h-[22px] w-[22px] [image-rendering:pixelated] sm:h-[26px] sm:w-[26px]" />
      )}
      <span className="font-pixel text-[11px] text-[#5a3a1e] sm:text-sm">{text}</span>
      {!iconFirst && (
        <img src={icon} alt="" className="h-[22px] w-[22px] [image-rendering:pixelated] sm:h-[26px] sm:w-[26px]" />
      )}
    </button>
  )

  return (
    // 吸底：内容超过一屏时翻页键自动贴在视口底部（z-20 压过卡片），内容短时停在自然位置；
    // 关于我页由 Hero 用 absolute 容器包住，sticky 不生效、按首屏固定定位渲染；
    // 竖屏右侧留白（pr-20）避开右下角 home/音乐键
    <div className="sticky bottom-4 z-20 flex items-center justify-center gap-4 pb-6 pl-2 pr-20 sm:gap-10 sm:px-0">
      {prev && btn(prev.to, `${UI}/left.png`, `上一页 · ${prev.label}`, true, `上一页：${prev.label}`)}
      {next && btn(next.to, `${UI}/right.png`, `下一页 · ${next.label}`, false, `下一页：${next.label}`)}
    </div>
  )
}
