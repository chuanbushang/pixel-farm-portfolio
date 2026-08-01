import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import PixelArt from './PixelArt'
import SpriteAnim, { type SpriteAnimSpec } from './SpriteAnim'

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
  noExpand?: boolean // 封面纯展示，不可点击展开详情
  coverContain?: boolean // 封面始终完整显示原构图（不裁切，横竖版一致）
  coverPos?: string // 封面裁切取景位置（CSS object-position，如 'bottom' 取最下方）
  cornerAnim?: SpriteAnimSpec // 右下角逐帧动图装饰
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
  noExpand,
  coverContain,
  coverPos,
  cornerAnim,
}: ExpandableItemProps) {
  const [open, setOpen] = useState(false)
  const [zoomOpen, setZoomOpen] = useState(false) // 灯箱：浮层查看原图
  const [coverPortrait, setCoverPortrait] = useState(false) // 封面为竖版图时完整展示
  const [imgIdx, setImgIdx] = useState(0) // 轮播当前张
  const [pauseUntil, setPauseUntil] = useState(0) // 交互后暂停自动轮换到此时间戳
  const [hovering, setHovering] = useState(false) // 悬停轮播区也算交互
  const hasImages = images && images.length > 0
  const multi = hasImages && images!.length > 1

  // 灯箱打开时：Esc 关闭、多图时 ← → 切换
  useEffect(() => {
    if (!zoomOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomOpen(false)
      if (!multi) return
      if (e.key === 'ArrowLeft') manualSwitch(imgIdx - 1)
      if (e.key === 'ArrowRight') manualSwitch(imgIdx + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoomOpen, imgIdx, multi, images])

  // 点开详情后才以 2.5s/张 自动轮换（封面同步变化）；灯箱打开时停止自动轮换防闪屏；悬停或手动切换后暂停，4s 无操作恢复
  useEffect(() => {
    if (!open || !multi || zoomOpen) return
    const t = setInterval(() => {
      if (!hovering && Date.now() >= pauseUntil) {
        setImgIdx((i) => (i + 1) % images!.length)
      }
    }, 2500)
    return () => clearInterval(t)
  }, [open, multi, zoomOpen, hovering, pauseUntil, images])

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
          </div>
          {tag && (
            <span className="mt-1 inline-block border-2 border-[#8b5a2b] bg-[#f9e7bd] px-2 py-0.5 font-pixel text-xs text-[#6b4423]">
              {tag}
            </span>
          )}
          {brief && <p className="font-pixel mt-1 text-sm leading-relaxed text-[#5a4632]">{brief}</p>}
          {tech && tech.length > 0 && (
            <p className="font-pixel mt-1 text-xs text-[#8b5a2b]">
              {tech.map((t) => `「${t}」`).join(' ')}
            </p>
          )}
        </div>
        {badge && (
          <span className="shrink-0 border-2 border-[#8b5a2b] bg-[#f9e7bd] px-2 py-0.5 font-pixel text-xs text-[#6b4423]">
            {badge}
          </span>
        )}
      </div>

      {/* 封面区：点击展开/收起；未展开时固定显示封面图，展开后随轮播同步（hideCover 时整块不渲染；noExpand 时纯展示不可点击） */}
      {!hideCover && (
      <button
        type="button"
        onClick={() => !noExpand && setOpen((v) => !v)}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className={`relative mt-3 block w-full overflow-hidden border-2 border-[#6b4423] text-left ${noExpand ? 'cursor-default' : 'cursor-pointer'}`}
        aria-expanded={open}
      >
        {hasImages ? (
          coverPortrait || coverContain ? (
            // 完整显示封面：不裁切原构图（竖版自动 / coverContain 强制），两侧衬奶油底
            <div className="flex h-96 w-full items-center justify-center bg-[#e8d9b0]">
              <img
                key={open ? images![imgIdx] : images![0]}
                src={open ? images![imgIdx] : images![0]}
                alt={title}
                onLoad={(e) => {
                  const img = e.currentTarget
                  setCoverPortrait(img.naturalHeight > img.naturalWidth)
                }}
                className={`h-full w-auto max-w-full object-contain ${noExpand ? '' : 'transition-all group-hover:scale-105 group-hover:opacity-50'}`}
              />
            </div>
          ) : (
            // 横版封面：铺满裁切（coverPos 可指定取景位置，如 bottom 取最下方）
            <img
              key={open ? images![imgIdx] : images![0]}
              src={open ? images![imgIdx] : images![0]}
              alt={title}
              onLoad={(e) => {
                const img = e.currentTarget
                setCoverPortrait(img.naturalHeight > img.naturalWidth)
              }}
              style={coverPos ? { objectPosition: coverPos } : undefined}
              className={`h-64 w-full object-cover ${noExpand ? '' : 'transition-all group-hover:scale-105 group-hover:opacity-50'}`}
            />
          )
        ) : (
          <div className="flex h-24 w-full items-center justify-center bg-[#e8d9b0] font-pixel text-sm text-[#8b5a2b]">
            封面图待上传
          </div>
        )}
        {!noExpand && (
        <span className="absolute inset-0 flex items-center justify-center font-pixel text-sm text-[#3b2a1a] opacity-0 transition-opacity group-hover:opacity-100">
          {open ? '▲ 点击收起详情' : '▼ 点击展开详情'}
        </span>
        )}
      </button>
      )}

      {/* 右下角逐帧动图装饰（角色 / dogsmile） */}
      {cornerAnim && (
        <div className="pointer-events-none absolute bottom-2 right-2">
          <SpriteAnim {...cornerAnim} />
        </div>
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
              <div className="relative flex h-80 min-w-0 flex-1 items-center justify-center border-2 border-[#6b4423] bg-[#e8d9b0]">
                <img
                  src={images![imgIdx]}
                  alt={`${title} 图 ${imgIdx + 1}`}
                  onClick={() => setZoomOpen(true)}
                  title="点击查看原图"
                  className="h-full w-auto max-w-full cursor-zoom-in object-contain transition-opacity hover:opacity-80"
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
      {/* 灯箱：点击详情图后浮层查看原图；Esc / 点击背景 / ✕ 关闭，多图可 ◀ ▶ / ← → 切换。
          必须 createPortal 到 body：卡片 article 悬停带 transform，会把 fixed 灯箱困进卡片层叠上下文导致闪烁 */}
      {zoomOpen && hasImages && createPortal(
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-6"
          onClick={() => setZoomOpen(false)}
        >
          <img
            src={images![imgIdx]}
            alt={`${title} 原图 ${imgIdx + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full border-4 border-[#6b4423] bg-[#e8d9b0] object-contain"
          />
          <button
            type="button"
            onClick={() => setZoomOpen(false)}
            className="absolute right-4 top-4 cursor-pointer border-2 border-[#6b4423] bg-[#f9e7bd] p-1.5 transition-transform hover:scale-110"
            aria-label="关闭"
          >
            <img
              src="/assets/icons/ui/Ui-xx.png"
              alt="关闭"
              style={{ width: 28, height: 28, imageRendering: 'pixelated' }}
            />
          </button>
          {multi && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); manualSwitch(imgIdx - 1) }}
                className="wood-btn absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer px-3 py-2 font-pixel text-lg text-[#5a3a1e]"
                aria-label="上一张"
              >
                ◀
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); manualSwitch(imgIdx + 1) }}
                className="wood-btn absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer px-3 py-2 font-pixel text-lg text-[#5a3a1e]"
                aria-label="下一张"
              >
                ▶
              </button>
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 border-2 border-[#8b5a2b] bg-[#f9e7bd]/90 px-2 py-0.5 font-pixel text-xs text-[#6b4423]">
                {imgIdx + 1} / {images!.length}
              </span>
            </>
          )}
        </div>,
        document.body
      )}
    </article>
  )
}
