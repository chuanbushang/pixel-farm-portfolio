import type { CSSProperties } from 'react'

interface PixelArtProps {
  rows: readonly string[]
  palette: Record<string, string>
  scale?: number
  className?: string
  style?: CSSProperties
}

/** 用字符画渲染像素图：rows 里每个字符对应 palette 里的颜色，'.' 透明 */
export default function PixelArt({ rows, palette, scale = 4, className, style }: PixelArtProps) {
  const w = rows[0]?.length ?? 0
  return (
    <div
      className={className}
      aria-hidden
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${w}, ${scale}px)`,
        gridAutoRows: `${scale}px`,
        lineHeight: 0,
        ...style,
      }}
    >
      {rows.flatMap((row, y) =>
        row
          .padEnd(w, '.')
          .split('')
          .map((ch, x) => (
            <div key={`${y}-${x}`} style={{ background: ch === '.' ? 'transparent' : palette[ch] ?? 'transparent' }} />
          )),
      )}
    </div>
  )
}
