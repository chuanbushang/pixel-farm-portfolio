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
  // 音乐提示（attention 星标 + 闪烁文本）：每次刷新重新出现，点击音乐牌子后消失（不持久化）
  const [musicHint, setMusicHint] = useState(true)

  return (
    <section
      className="relative flex min-h-screen select-none flex-col items-center justify-center overflow-hidden px-4 pb-8 pt-24 transition-colors duration-700"
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
        className="relative z-10 mx-4 mb-8 w-[min(80vw,420px)] md:mb-12 md:w-[min(92vw,560px)]"
        draggable={false}
      />

      {/* 木头菜单按钮（第 8 块「音乐」弹出音乐设置，与「联系我」对称） */}
      <nav className="relative z-10 grid grid-cols-2 gap-4 px-4 sm:grid-cols-4 md:gap-7">
        {menu.map((item) => (
          <div key={item.id} className="relative">
            {/* 音乐提示：attention 星标（右上角外侧，呼吸缩放）+ 白色无背景闪烁文本，点击后消失 */}
            {item.id === 'music' && musicHint && (
              <>
                <img
                  src="/assets/icons/ui/attention.png"
                  alt=""
                  className="animate-breathe absolute -top-3 right-0 z-20"
                  style={{ width: 10, height: 10, imageRendering: 'pixelated' }}
                />
                <span
                  className="animate-blink font-pixel absolute bottom-1 right-1 z-20 whitespace-nowrap text-right text-[10px] leading-3 text-white"
                  style={{ textShadow: '1px 1px 0 #3b2a1a' }}
                >
                  点击此处
                  <br />
                  设置音乐
                </span>
              </>
            )}
            <button
              onClick={() =>
                item.id === 'music'
                  ? (setShowMusic((v) => !v), setMusicHint(false))
                  : onNavigate(item.id)
              }
              className="wood-btn flex w-28 flex-col items-center gap-2 px-3 py-3 sm:w-32 sm:px-4 sm:py-4 md:w-36"
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
          </div>
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
