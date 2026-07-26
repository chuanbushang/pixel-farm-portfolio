import Hero from '../sections/Hero'
import { useFarm } from '../context/FarmContext'
import { profile } from '../data/profile'
import { grassBackground } from '../lib/grass'

/** 关于我页面：角色卡 + 地面四季装饰 + 页脚草地 */
export default function AboutPage() {
  const { cfg } = useFarm()

  return (
    <>
      <div id="about">
        <Hero season={cfg} />
      </div>

      {/* 页脚草地（随季节变色） */}
      <footer className="relative">
        <div className="h-2 w-full" style={{ background: cfg.grassDark }} />
        <div
          className="flex h-24 w-full flex-col items-center justify-center gap-1"
          style={grassBackground(cfg)}
        >
          <p className="font-pixel text-sm text-[#2f5d33]">© 2026 {profile.farmName}</p>
          <p className="font-pixel text-xs text-[#4a7a4e]">
            用 ❤ 和像素手工制作 · 把音乐命名为 bgm-spring.mp3 等放进 public/ 可替换对应季节 BGM
          </p>
        </div>
      </footer>
    </>
  )
}
