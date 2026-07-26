// 星露谷 critters.png 原版蝴蝶贴图（3 帧扇翅动画条，16x16/帧）
const SPRITES = ['blue', 'red', 'yellow', 'green', 'pink', 'orange'] as const

// 8 只蝴蝶统一 40s 过河周期、每 5s 出发一只（负延迟均匀铺开），
// 任意时刻都有 3-4 只在屏幕上，循环无缝、永不间断
const CYCLE = 40
const items = Array.from({ length: 8 }, (_, i) => ({
  top: 12 + ((i * 23 + 7) % 58),
  duration: CYCLE,
  delay: -i * (CYCLE / 8),
  sprite: SPRITES[i % SPRITES.length],
  flapDelay: -(i * 0.13),
  bobDuration: 1.2 + (i % 4) * 0.3,
  near: i % 3 === 0,
}))

/** 夏季专属：星露谷原版彩色蝴蝶横飞（近景 + 远景两层） */
export default function Butterflies() {
  const renderButterfly = (item: (typeof items)[number], i: number) => {
    // 蝴蝶不超过 30px：近景 28px、远景 20px
    const size = item.near ? 28 : 20
    return (
      <div
        key={i}
        className="animate-drift absolute"
        style={{
          top: `${item.top}%`,
          animationDuration: `${item.duration}s`,
          animationDelay: `${item.delay}s`,
        }}
      >
        <div className="animate-bob" style={{ animationDuration: `${item.bobDuration}s` }}>
          <div
            className="animate-sprite-flap"
            style={{
              width: size,
              height: size,
              backgroundImage: `url(/assets/icons/animals/butterfly-${item.sprite}.png)`,
              backgroundSize: '300% 100%',
              imageRendering: 'pixelated',
              animationDelay: `${item.flapDelay}s`,
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <>
      {/* 远景层：内容之下 */}
      <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden>
        {items.filter((it) => !it.near).map(renderButterfly)}
      </div>
      {/* 近景层：内容之上，翅膀更大 */}
      <div className="pointer-events-none fixed inset-0 z-[15] overflow-hidden" aria-hidden>
        {items.filter((it) => it.near).map(renderButterfly)}
      </div>
    </>
  )
}
