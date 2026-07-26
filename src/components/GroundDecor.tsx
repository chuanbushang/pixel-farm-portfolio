import type { Season } from '../data/seasons'

interface GroundDecorProps {
  season: Season
}

const PLANTS = '/assets/icons/plants'
const ANIMALS = '/assets/icons/animals'

// 四季固定的尺寸（像素）：树 180 > 树篱 70 > 草 27
const TREE_H = 180
const HEDGE_H = 70
const GRASS_H = 27

/** 原版 tree3 贴图：左下×2、左侧×1（间距不规则但不紧靠）、右下×2，四季位置固定仅换贴图 */
function Trees({ season }: { season: Season }) {
  const img = (className: string) => (
    <div key={className} className={className}>
      <img
        src={`${PLANTS}/tree3-${season}.png`}
        alt=""
        style={{ imageRendering: 'pixelated', height: TREE_H }}
      />
    </div>
  )
  return (
    <>
      {img('absolute bottom-0 left-[1.5%]')}
      {img('absolute bottom-0 left-[9.5%]')}
      {img('absolute bottom-0 left-[22%]')}
      {img('absolute bottom-0 right-[13%]')}
      {img('absolute bottom-0 right-[2%]')}
    </>
  )
}

/** 原版树篱：四季位置与大小固定 */
function Hedges({ season }: { season: Season }) {
  const img = (className: string) => (
    <div key={className} className={className}>
      <img
        src={`${PLANTS}/bush-${season}.png`}
        alt=""
        style={{ imageRendering: 'pixelated', height: HEDGE_H }}
      />
    </div>
  )
  return (
    <>
      {img('absolute bottom-0 left-[35%]')}
      {img('absolute bottom-0 right-[25%]')}
    </>
  )
}

/** 原版草丛：铺满全部地面，位于树木前方形成遮挡（relative 保证叠放次序） */
function GrassTufts({ season }: { season: Season }) {
  return (
    <div className="relative flex items-end justify-between px-[1%]">
      {Array.from({ length: 16 }, (_, i) => (
        <img
          key={i}
          src={`${PLANTS}/grass-${season}-${(i % 2) + 1}.png`}
          alt=""
          style={{
            imageRendering: 'pixelated',
            height: GRASS_H + (i % 3) * 4,
            transform: `translateY(${(i % 2) * 2}px)`,
          }}
        />
      ))}
    </div>
  )
}

/** 2 帧动物贴图条（侧视吃草/踱步循环） */
function AnimalStrip({ src, frameW, scale }: { src: string; frameW: number; scale: number }) {
  return (
    <div
      className="animate-frames2"
      style={{
        width: frameW * scale,
        height: frameW * scale,
        backgroundImage: `url(${src})`,
        backgroundSize: '200% 100%',
        imageRendering: 'pixelated',
      }}
    />
  )
}

/** 主页第一屏（Hero）地面装饰：树篱 → 树木 → 草丛（草在最前形成遮挡），四季仅换贴图 */
export default function GroundDecor({ season }: GroundDecorProps) {
  return (
    <div className="absolute bottom-8 left-0 right-0 z-[5]" aria-hidden>
      <Hedges season={season} />
      <Trees season={season} />

      {/* 草丛最后渲染：遮挡树脚，四季地平线一致 */}
      <GrassTufts season={season} />

      {/* 春夏秋：小鸡排队（Golden → BabyBrown → BabyWhite → BabyBlue），
          间隔宽松、低于树篱，位于草丛前方 */}
      {season !== 'winter' && (
        <div className="absolute bottom-0 left-[40%] z-10 flex items-end gap-6">
          <AnimalStrip src={`${ANIMALS}/chicken-golden-side.png`} frameW={16} scale={2} />
          <AnimalStrip src={`${ANIMALS}/chicken-brown-side.png`} frameW={16} scale={1.5} />
          <AnimalStrip src={`${ANIMALS}/chicken-white-side.png`} frameW={16} scale={1.5} />
          <AnimalStrip src={`${ANIMALS}/chicken-blue-side.png`} frameW={16} scale={1.5} />
        </div>
      )}
    </div>
  )
}
