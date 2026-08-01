import { useEffect, useState } from 'react'

export interface SpriteAnimSpec {
  src: string // 横向动画条路径
  frames: number // 帧数
  frameMs?: number // 每帧间隔（默认 400ms）
  w: number // 显示宽度 px
  h: number // 显示高度 px
}

/** 横向动画条逐帧播放器（JS 步进，帧数/速度任意） */
export default function SpriteAnim({ src, frames, frameMs = 400, w, h }: SpriteAnimSpec) {
  const [i, setI] = useState(0)

  useEffect(() => {
    setI(0)
    const t = setInterval(() => setI((v) => (v + 1) % frames), frameMs)
    return () => clearInterval(t)
  }, [src, frames, frameMs])

  return (
    <div
      aria-hidden
      style={{
        width: w,
        height: h,
        backgroundImage: `url(${src})`,
        backgroundSize: `${frames * w}px ${h}px`, // 像素级定位：每帧恰好 w px，绝不错位
        backgroundPosition: `-${i * w}px 0`,
        imageRendering: 'pixelated',
      }}
    />
  )
}
