interface SeasonParticlesProps {
  kind: 'petal' | 'none' | 'leaf' | 'snow'
  light?: boolean // 竖屏轻量模式：只要远景层且数量减半
}

const COLORS: Record<string, string[]> = {
  petal: ['#ffb7c5', '#ffc9d4', '#ff9db4'],
  leaf: ['#d97b2e', '#c85a2a', '#e8a13c'],
  snow: ['#ffffff', '#e8f2fb'],
}

// 确定性伪随机分布（加密版：数量翻倍，频率更高）
// near=true 的为近景层：更大、在内容之上，制造前后纵深感
function makeItems(kind: string) {
  return Array.from({ length: 44 }, (_, i) => {
    const palette = COLORS[kind]
    const near = i % 3 === 0
    return {
      left: (i * 41.3 + 9) % 100,
      delay: (i % 14) * 0.8,
      duration: near ? 7 + (i % 4) * 1.5 : 9 + (i % 6) * 2,
      size: near ? 8 + (i % 3) * 3 : 4 + (i % 3) * 2,
      color: palette[i % palette.length],
      near,
    }
  })
}

export default function SeasonParticles({ kind, light }: SeasonParticlesProps) {
  if (kind === 'none') return null
  const items = makeItems(kind)
  const allFar = items.filter((it) => !it.near)
  const near = items.filter((it) => it.near)
  // 竖屏轻量模式：远景层取一半，近景层整层不渲染（省 GPU 合成开销）
  const far = light ? allFar.filter((_, i) => i % 2 === 0) : allFar

  const renderItem = (item: (typeof items)[number], i: number) => {
    // 春季：leaves.png 第一行原版粉色花瓣贴图（11 片，单体 ≤10px）
    if (kind === 'petal') {
      const w = item.near ? 9 + (i % 2) : 6 + (i % 2) * 2
      return (
        <img
          key={`${kind}-${i}`}
          src={`/assets/icons/plants/petal-${(i % 11) + 1}.png`}
          alt=""
          className="animate-fall absolute"
          style={{
            left: `${item.left}%`,
            top: 0,
            width: w,
            height: 'auto',
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
            opacity: item.near ? 0.95 : 0.7,
            imageRendering: 'pixelated',
          }}
        />
      )
    }
    // 秋季：使用 z_Leaves 原版落叶贴图（8 橙褐 + 4 红，约 10px 小叶）
    if (kind === 'leaf') {
      const w = item.near ? 12 + (i % 3) * 2 : 8 + (i % 3) * 2
      return (
        <img
          key={`${kind}-${i}`}
          src={`/assets/icons/plants/leaf-${(i % 12) + 1}.png`}
          alt=""
          className="animate-fall absolute"
          style={{
            left: `${item.left}%`,
            top: 0,
            width: w,
            height: 'auto',
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
            opacity: item.near ? 0.95 : 0.7,
            imageRendering: 'pixelated',
          }}
        />
      )
    }
    return (
      <div
        key={`${kind}-${i}`}
        className="animate-fall absolute"
        style={{
          left: `${item.left}%`,
          top: 0,
          width: item.size,
          height: item.size,
          background: item.color,
          animationDelay: `${item.delay}s`,
          animationDuration: `${item.duration}s`,
          opacity: item.near ? 0.95 : 0.7,
        }}
      />
    )
  }

  return (
    <>
      {/* 远景层：内容之下 */}
      <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden>
        {far.map(renderItem)}
      </div>
      {/* 近景层：内容之上，更大更快（竖屏轻量模式不渲染） */}
      {!light && (
        <div className="pointer-events-none fixed inset-0 z-[15] overflow-hidden" aria-hidden>
          {near.map(renderItem)}
        </div>
      )}
    </>
  )
}
