import { useState } from 'react'
import PixelArt from '../components/PixelArt'
import MusicPanel from '../components/MusicPanel'
import { note } from '../components/sprites'
import { profile } from '../data/profile'
import { SEASON_BG } from '../data/seasons'
import { useFarm } from '../context/FarmContext'

interface TitleScreenProps {
  onNavigate: (sectionId: string | null) => void
}

const UI = '/assets/icons/ui'
const menu = [
  { id: 'about', label: '关于我', img: `${UI}/obj-cookie.png` },
  { id: 'hobbies', label: '爱好', img: `${UI}/heart-4x.png` },
  { id: 'skills', label: '技能', img: `${UI}/obj-starbook.png` },
  { id: 'experience', label: '经历', img: `${UI}/key-4x.png` },
  { id: 'projects', label: '项目', img: `${UI}/obj-spur.png` },
  { id: 'honors', label: '荣誉', img: `${UI}/obj-ticket.png` },
  { id: 'contact', label: '联系我', img: `${UI}/point-4x.png` },
  { id: 'music', label: '音乐', icon: note },
]

export default function TitleScreen({ onNavigate }: TitleScreenProps) {
  const { season, cfg, music } = useFarm()
  const [showMusic, setShowMusic] = useState(false)

  return (
    <section
      className="relative flex h-screen select-none flex-col items-center justify-center overflow-hidden px-4 pb-8 pt-20 transition-colors duration-700"
      style={{
        backgroundImage: `url(/assets/icons/buildings/HighlandsBackground_${SEASON_BG[season]}.png), linear-gradient(to bottom, ${cfg.titleTop}, ${cfg.titleMid}, ${cfg.titleBottom})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        imageRendering: 'pixelated',
      }}
    >
      {/* 农场招牌（用户最终版 my-farm，直接放图不加文字） */}
      <img
        src="/assets/icons/ui/my-farm-web.png"
        alt={profile.farmName}
        className="relative z-10 mx-4 mb-12 w-[min(92vw,560px)]"
        draggable={false}
      />

      {/* 木头菜单按钮（第 8 块「音乐」弹出音乐设置，与「联系我」对称） */}
      <nav className="relative z-10 grid grid-cols-2 gap-5 px-4 sm:grid-cols-4 md:gap-7">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => (item.id === 'music' ? setShowMusic((v) => !v) : onNavigate(item.id))}
            className="wood-btn flex w-32 flex-col items-center gap-2 px-4 py-4 md:w-36"
            style={
              item.id === 'music' && showMusic
                ? { filter: 'brightness(1.15) saturate(1.2)', transform: 'translateY(2px)' }
                : undefined
            }
            aria-pressed={item.id === 'music' ? showMusic : undefined}
          >
            <span className="font-pixel text-lg text-[#5a3a1e]">{item.label}</span>
            {'img' in item && item.img ? (
              <img src={item.img} alt="" style={{ width: 36, height: 36, imageRendering: 'pixelated' }} />
            ) : (
              <PixelArt rows={item.icon!.rows} palette={item.icon!.palette} scale={3} />
            )}
          </button>
        ))}
      </nav>

      {/* 音乐设置弹出面板（音量 + 默认曲） */}
      {showMusic && (
        <div className="relative z-10 mt-6">
          <MusicPanel
            volume={music.volume}
            onVolumeChange={music.setVolume}
            defaultMode={music.defaultMode}
            onToggleDefault={music.toggleDefaultMode}
          />
        </div>
      )}

      <p className="animate-blink font-pixel relative z-10 mt-8 text-sm text-[#fff7dd]/90" style={{ textShadow: '2px 2px 0 #6b4423' }}>
        ▲ 选择一块牌子进入农场 ▲
      </p>
    </section>
  )
}
