import { SEASONS, SEASON_ORDER, type Season } from '../data/seasons'

interface SeasonSwitcherProps {
  season: Season
  onChange: (season: Season) => void
}

const UI = '/assets/icons/ui'
// 四季作物图标（Objects_2 第 11 行）：胡萝卜 / 金皮西葫芦 / 西蓝花 / 霜瓜
const iconMap: Record<Season, string> = {
  spring: `${UI}/obj-carrot.png`,
  summer: `${UI}/obj-squash.png`,
  autumn: `${UI}/obj-broccoli.png`,
  winter: `${UI}/obj-melon.png`,
}

export default function SeasonSwitcher({ season, onChange }: SeasonSwitcherProps) {
  return (
    <div className="flex shrink-0 gap-1 sm:gap-2" role="group" aria-label="切换季节">
      {SEASON_ORDER.map((id) => {
        const cfg = SEASONS[id]
        const active = id === season
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className="wood-btn flex flex-col items-center gap-0.5 px-1.5 py-1 sm:gap-1 sm:px-3 sm:py-2"
            style={active ? { filter: 'brightness(1.15) saturate(1.2)', transform: 'translateY(2px)' } : undefined}
            aria-pressed={active}
            title={`切换到${cfg.label}季`}
          >
            <img
              src={iconMap[id]}
              alt=""
              className="h-[18px] w-[18px] [image-rendering:pixelated] sm:h-[22px] sm:w-[22px]"
            />
            <span className="font-pixel text-[10px] text-[#5a3a1e] sm:text-xs">{cfg.label}</span>
          </button>
        )
      })}
    </div>
  )
}
