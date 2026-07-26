import { useEffect, useState } from 'react'
import PixelArt from './PixelArt'

interface ExpandableItemProps {
  title: string
  brief?: string
  tech?: string[] // 单体技术备注
  badge?: string // 右上角小徽章（年份 / 时间段）
  tag?: string // 分类小标签
  icon?: { rows: readonly string[]; palette: Record<string, string> }
  iconImg?: string // 贴图图标（优先于 icon）
  detail?: string[] // 展开后的文字详情
  images?: string[] // public/assets/material/ 下的图片路径
  imageHint?: string // 无图时的占位提示
  hideCover?: boolean // 不显示封面区（如「开发中」占位卡）
  cornerSprite?: string // 右下角 7 帧动图装饰（50px，如 dogsmile-7.png）
}

/**
 * 上文下图 + 点击展开详情 的通用卡片。
 * 悬停：标题变色微放大、封面半透明；点击封面/卡片展开详情区。
 */
export default function ExpandableItem({
  title,
  brief,
  tech,
  badge,
  tag,
  icon,
  iconImg,
  detail,
  images,
  imageHint,
  hideCover,
  cornerSprite,
}: ExpandableItemProps) {
  const [open, setOpen] = useState(false)
  const [coverPortrait, setCoverPortrait] = useState(false) // 封面为竖版图时完整展示
  const [imgIdx, setImgIdx] = useState(0) // 轮播当前张
  const [pauseUntil, setPauseUntil] = useState(0) // 交互后暂停自动轮换到此时间戳
  const [hovering, setHovering] = useState(false) // 悬停轮播区也算交互
  const hasImages = images && images.length > 0
  const multi = hasImages && images!.length > 1

  // 无交互时以 2.5s/张 自动轮换（封面同步变化）；悬停或手动切换后暂停，4s 无操作恢复
  useEffect(() => {
    if (!multi) return
    const t = setInterval(() => {
      if (!hovering && Date.now() >= pauseUntil) {
        setImgIdx((i) => (i + 1) % images!.length)
      }
    }, 2500)
    return () => clearInterval(t)
  }, [multi, hovering, pauseUntil, images])

  const manualSwitch = (next: number) => {
    setImgIdx((next + images!.length) % images!.length)
    setPauseUntil(Date.now() + 4000)
  }

  return (
    <article className="group relative border-4 border-[#6b4423] bg-[#fdf3d8] p-4 transition-transform hover:-translate-y-0.5">
      {/* 标题行 */}
      <div className="flex items-start gap-3">
        {(icon || iconImg) && (
          <div className="wood-icon flex h-14 w-14 shrink-0 items-center justify-center">
            {iconImg ? (
              <img src={iconImg} alt="" style={{ width: 34, height: 34, objectFit: 'contain', imageRendering: 'pixelated' }} />
            ) : (
              <PixelArt rows={icon!.rows} palette={icon!.palette} scale={4} />
            )}
          </div>
        )}
        <div className="flex-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <h3 className="font-pixel origin-left text-lg text-[#3b2a1a] transition-all group-hover:scale-[1.03] group-hover:text-[#b0514a]">
              {title}
            </h3>
            {tag && (
              <span className="border-2 border-[#8b5a2b] bg-[#f9e7bd] px-2 py-0.5 font-pixel text-xs text-[#6b4423]">
                {tag}
              </span>
            )}
          </div>
          {brief && <p className="font-pixel mt-1 text-sm leading-relaxed text-[#5a4632]">{brief}</p>}
          {tech && tech.length > 0 && (
            <p className="font-pixel mt-1 text-xs text-[#8b5a2b]">
              备注：{tech.map((t) => `「${t}」`).join(' ')}
            </p>
          )}
        </div>
        {badge && (
          <span className="shrink-0 border-2 border-[#8b5a2b] bg-[#f9e7bd] px-2 py-0.5 font-pixel text-xs text-[#6b4423]">
            {badge}
          </span>
        )}
      </div>

      {/* 封面区：点击展开/收起；随轮播同步变化，悬停时暂停轮换（hideCover 时整块不渲染） */}
      {!hideCover && (
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="relative mt-3 block w-full cursor-pointer overflow-hidden border-2 border-[#6b4423] text-left"
        aria-expanded={open}
      >
        {hasImages ? (
          coverPortrait ? (
            // 竖版封面：完整显示不裁切，加高展示位，两侧衬奶油底（与详情轮播同步）
            <div className="flex h-72 w-full items-center justify-center bg-[#e8d9b0]">
              <img
                key={images![imgIdx]}
                src={images![imgIdx]}
                alt={title}
                onLoad={(e) => {
                  const img = e.currentTarget
                  setCoverPortrait(img.naturalHeight > img.naturalWidth)
                }}
                className="h-full w-auto object-contain transition-all group-hover:scale-105 group-hover:opacity-50"
              />
            </div>
          ) : (
            // 横版封面：铺满裁切（与详情轮播同步）
            <img
              key={images![imgIdx]}
              src={images![imgIdx]}
              alt={title}
              onLoad={(e) => {
                const img = e.currentTarget
                setCoverPortrait(img.naturalHeight > img.naturalWidth)
              }}
              className="h-40 w-full object-cover transition-all group-hover:scale-105 group-hover:opacity-50"
            />
          )
        ) : (
          <div className="flex h-24 w-full items-center justify-center bg-[#e8d9b0] font-pixel text-sm text-[#8b5a2b]">
            封面图待上传
          </div>
        )}
        <span className="absolute inset-0 flex items-center justify-center font-pixel text-sm text-[#3b2a1a] opacity-0 transition-opacity group-hover:opacity-100">
          {open ? '▲ 点击收起详情' : '▼ 点击展开详情'}
        </span>
      </button>
      )}

      {/* 右下角 7 帧动图装饰（如 dogsmile，50px） */}
      {cornerSprite && (
        <div
          className="animate-frames7 pointer-events-none absolute bottom-2 right-2"
          aria-hidden
          style={{
            width: 50,
            height: 53,
            backgroundImage: `url(${cornerSprite})`,
            backgroundSize: '700% 100%',
            imageRendering: 'pixelated',
          }}
        />
      )}

      {/* 展开详情区 */}
      {open && (
        <div className="mt-3 border-t-2 border-dashed border-[#8b5a2b] pt-3">
          {detail && detail.length > 0 && (
            <ul className="space-y-1">
              {detail.map((line, i) => (
                <li key={i} className="font-pixel text-sm leading-relaxed text-[#5a4632]">
                  · {line}
                </li>
              ))}
            </ul>
          )}
          {hasImages ? (
            // 详情轮播：◀ ▶ 手动切换；无交互时 1s/张 自动轮换（悬停/点击后暂停 4s）
            <div
              className="mt-2 flex items-center gap-2"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              {multi && (
                <button
                  type="button"
                  onClick={() => manualSwitch(imgIdx - 1)}
                  className="wood-btn shrink-0 cursor-pointer px-2 py-1 font-pixel text-sm text-[#5a3a1e]"
                  aria-label="上一张"
                >
                  ◀
                </button>
              )}
              <div className="relative flex h-56 min-w-0 flex-1 items-center justify-center border-2 border-[#6b4423] bg-[#e8d9b0]">
                <img
                  src={images![imgIdx]}
                  alt={`${title} 图 ${imgIdx + 1}`}
                  className="h-full w-auto max-w-full object-contain"
                />
                {multi && (
                  <span className="absolute bottom-1 right-1 border-2 border-[#8b5a2b] bg-[#f9e7bd]/90 px-1.5 font-pixel text-[10px] text-[#6b4423]">
                    {imgIdx + 1} / {images!.length}
                  </span>
                )}
              </div>
              {multi && (
                <button
                  type="button"
                  onClick={() => manualSwitch(imgIdx + 1)}
                  className="wood-btn shrink-0 cursor-pointer px-2 py-1 font-pixel text-sm text-[#5a3a1e]"
                  aria-label="下一张"
                >
                  ▶
                </button>
              )}
            </div>
          ) : (
            <p className="font-pixel mt-2 border-2 border-dashed border-[#8b5a2b] bg-[#f9e7bd] px-3 py-2 text-xs text-[#8b5a2b]">
              📷 {imageHint ?? '图片素材位：把图片放进 public/assets/material/ 并告诉 AI 文件名即可挂载'}
            </p>
          )}
        </div>
      )}
    </article>
  )
}
