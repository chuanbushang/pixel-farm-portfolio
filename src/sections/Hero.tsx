import PixelArt from '../components/PixelArt'
import GroundDecor from '../components/GroundDecor'
import PortraitUpload from '../components/PortraitUpload'
import { cloud } from '../components/sprites'
import { profile } from '../data/profile'
import { grassBackground } from '../lib/grass'
import type { SeasonConfig } from '../data/seasons'

interface HeroProps {
  season: SeasonConfig
}

export default function Hero({ season }: HeroProps) {
  return (
    <header className="relative flex min-h-screen items-center justify-center overflow-hidden pb-52 pt-24 sm:pt-16">
      {/* 天空装饰（无太阳） */}
      <PixelArt rows={cloud.rows} palette={cloud.palette} scale={5} className="animate-drift absolute top-[15%] opacity-90" style={{ animationDuration: '75s' }} />
      <PixelArt rows={cloud.rows} palette={cloud.palette} scale={3} className="animate-drift absolute top-[30%] opacity-60" style={{ animationDuration: '105s', animationDelay: '-50s' }} />
      <PixelArt rows={cloud.rows} palette={cloud.palette} scale={4} className="animate-drift absolute top-[6%] opacity-75" style={{ animationDuration: '90s', animationDelay: '-25s' }} />

      {/* 星露谷对话界面：左侧对话框 + 右侧肖像面板；竖屏改为上下堆叠防文字挤压 */}
      <div className="relative z-10 mx-4 mt-8 flex w-full max-w-3xl flex-col items-center gap-4 sm:flex-row sm:items-stretch">
        {/* 左：textBox 对话框 */}
        <div className="stardew-textbox w-full flex-1 p-5 sm:p-6 md:p-7">
          <div className="space-y-3">
            <p className="font-pixel text-base text-[#8b5a2b] md:text-lg">{profile.title}</p>
            <p className="font-pixel text-sm text-[#6b4423]">
              农夫等级 LV.{profile.level} <span className="text-[#c9a227]">★</span>
            </p>
            <p className="font-pixel text-base leading-relaxed text-[#3b2a1a]">{profile.intro}</p>
          </div>
        </div>

        {/* 右：肖像面板（TitleButtons 木纹 + 照片上传区 + 名牌） */}
        <div className="portrait-panel flex w-40 shrink-0 flex-col items-center justify-center gap-3 p-3 md:w-48">
          <PortraitUpload />
          <div className="w-full border-2 border-[#8b5a2b] bg-[#f9e7bd] py-1 text-center">
            <span className="font-pixel text-base text-[#5a3a1e]">{profile.name}</span>
          </div>
        </div>
      </div>

      {/* 滚动提示 */}
      <div className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2 text-center">
        <p className="animate-hop font-pixel text-2xl text-[#fff7dd]" style={{ textShadow: '2px 2px 0 #6b4423' }}>▼</p>
      </div>

      {/* 地面四季装饰 */}
      <GroundDecor season={season.id} />

      {/* 底部草地（随季节变色 + 点阵纹理） */}
      <div className="absolute bottom-0 left-0 right-0 h-14">
        <div className="h-2 w-full" style={{ background: season.grassDark }} />
        <div className="h-full w-full" style={grassBackground(season)} />
      </div>
    </header>
  )
}
