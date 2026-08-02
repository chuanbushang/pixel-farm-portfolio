import type { CSSProperties, ReactNode } from 'react'
import PixelArt from './PixelArt'
import { flowerPink, flowerWhite, flowerYellow, holly, leaf, seasonIcons, watermelon } from './sprites'
import type { Season } from '../data/seasons'

interface SeasonalBoxProps {
  season: Season
  label: string
  children: ReactNode
}

const STRIPE_RED = 'repeating-linear-gradient(45deg, #d94a4a 0 10px, #f5f0e6 10px 20px)'
const STRIPE_GREEN = 'repeating-linear-gradient(45deg, #2f7a3a 0 8px, #f5f0e6 8px 16px)'

// 圣诞彩灯（不规则间距 + 四色循环）
const LIGHT_COLORS = ['#d94a4a', '#ffd94a', '#4a8ad9', '#4f9d3a']
const LIGHTS = [6, 15, 26, 38, 50, 62, 74, 85, 94].map((left, i) => ({
  left,
  color: LIGHT_COLORS[i % LIGHT_COLORS.length],
  delay: i * 0.33,
}))

const berry = { rows: ['r.r', '.r.'], palette: { r: '#c0392b' } }

// 春季：牌缘不规则点缀小花
const SPRING_FLOWERS = [
  { left: '7%', top: -9, scale: 2, f: 0 },
  { left: '23%', top: -6, scale: 2, f: 1 },
  { left: '41%', top: -10, scale: 3, f: 2 },
  { left: '66%', top: -7, scale: 2, f: 0 },
  { left: '84%', top: -10, scale: 2, f: 1 },
  { left: '95%', top: -6, scale: 2, f: 2 },
]
const SPRING_FLOWER_SPRITES = [flowerPink, flowerYellow, flowerWhite]

// 夏季：翠绿藤蔓爬牌缘
const SUMMER_VINES = [
  { left: '8%', top: -8, flip: false },
  { left: '20%', top: -5, flip: true },
  { left: '35%', top: -9, flip: false },
  { left: '52%', top: -6, flip: true },
  { left: '70%', top: -9, flip: false },
  { left: '88%', top: -5, flip: true },
]

// 秋季：枫叶 + 浆果 + 枯黄藤蔓
const AUTUMN_LEAVES = [
  { left: '6%', top: -8, scale: 2 },
  { left: '18%', top: -5, scale: 2 },
  { left: '33%', top: -9, scale: 3 },
  { left: '49%', top: -6, scale: 2 },
  { left: '64%', top: -10, scale: 2 },
  { left: '79%', top: -5, scale: 2 },
  { left: '92%', top: -8, scale: 2 },
]

function EdgeDecor({ season }: { season: Season }) {
  if (season === 'spring') {
    return (
      <>
        {SPRING_FLOWERS.map((p, i) => {
          const sprite = SPRING_FLOWER_SPRITES[p.f]
          return (
            <PixelArt
              key={i}
              rows={sprite.rows}
              palette={sprite.palette}
              scale={p.scale}
              className="absolute"
              style={{ left: p.left, top: p.top }}
            />
          )
        })}
        <PixelArt rows={flowerYellow.rows} palette={flowerYellow.palette} scale={2} className="absolute -bottom-2 left-[4%]" />
        <PixelArt rows={flowerPink.rows} palette={flowerPink.palette} scale={2} className="absolute -bottom-2 right-[5%]" />
      </>
    )
  }

  if (season === 'summer') {
    return (
      <>
        {SUMMER_VINES.map((p, i) => (
          <PixelArt
            key={i}
            rows={leaf.rows}
            palette={leaf.palette}
            scale={2}
            className={`absolute ${p.flip ? '-scale-x-100' : ''}`}
            style={{ left: p.left, top: p.top }}
          />
        ))}
        {/* 小太阳 + 西瓜切片 */}
        <PixelArt rows={seasonIcons.sunSmall.rows} palette={seasonIcons.sunSmall.palette} scale={2} className="absolute -top-3 right-2" />
        <PixelArt rows={watermelon.rows} palette={watermelon.palette} scale={3} className="absolute -bottom-3 right-[6%]" />
      </>
    )
  }

  if (season === 'autumn') {
    return (
      <>
        {/* 枯黄藤蔓 */}
        <div className="absolute -top-1 left-[15%] h-1 w-[12%] bg-[#7a5a36]" />
        <div className="absolute -top-1 left-[55%] h-1 w-[10%] bg-[#7a5a36]" />
        {AUTUMN_LEAVES.map((p, i) => (
          <PixelArt
            key={i}
            rows={seasonIcons.autumnLeaf.rows}
            palette={seasonIcons.autumnLeaf.palette}
            scale={p.scale}
            className="absolute"
            style={{ left: p.left, top: p.top }}
          />
        ))}
        <PixelArt rows={berry.rows} palette={berry.palette} scale={2} className="absolute -top-2 left-[27%]" />
        <PixelArt rows={berry.rows} palette={berry.palette} scale={2} className="absolute -top-2 left-[73%]" />
        <PixelArt rows={berry.rows} palette={berry.palette} scale={2} className="absolute -bottom-2 right-[8%]" />
      </>
    )
  }

  return null
}

/** 带四季边框装饰的星露谷木牌 */
export default function SeasonalBox({ season, label, children }: SeasonalBoxProps) {
  const nameplate = (
    <div className="absolute -top-4 left-6 z-10 bg-[#6b4423] px-4 py-1">
      <span className="font-pixel text-base text-[#f9e7bd]">{label}</span>
    </div>
  )

  if (season === 'winter') {
    return (
      <div className="relative" style={{ background: STRIPE_RED, padding: 6 }}>
        {/* 圣诞彩灯 */}
        {LIGHTS.map((light, i) => (
          <div
            key={i}
            className="animate-twinkle absolute z-10"
            style={{ left: `${light.left}%`, top: -4, width: 6, height: 6, background: light.color, animationDelay: `${light.delay}s` } as CSSProperties}
          />
        ))}
        {/* 冬青果 */}
        <PixelArt rows={holly.rows} palette={holly.palette} scale={2} className="absolute -left-1 -top-3 z-10" />
        <PixelArt rows={holly.rows} palette={holly.palette} scale={2} className="absolute -right-1 -top-3 z-10 -scale-x-100" />
        {/* 绿白条纹内框 */}
        <div style={{ background: STRIPE_GREEN, padding: 3 }}>
          <div className="stardew-textbox relative p-4 pt-7 sm:p-6 sm:pt-8 md:p-8 md:pt-10">
            {nameplate}
            {children}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="stardew-textbox relative p-4 pt-7 sm:p-6 sm:pt-8 md:p-8 md:pt-10">
      {nameplate}
      {children}
      <div className="pointer-events-none absolute inset-0">
        <EdgeDecor season={season} />
      </div>
    </div>
  )
}
